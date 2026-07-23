// Event model + formatting helpers, shared across the calendar widget,
// the Events list page and the event detail page. Events are sourced live
// from Google Calendar (see useCalendarEvents.ts); this module owns the
// normalised shape and all the date/time display logic.

export type EventItem = {
    id: string;
    title: string;
    /** ISO date-time for timed events, or `YYYY-MM-DD` for all-day events. */
    start: string;
    /**
     * End of the event. For all-day events this is the *inclusive* last day
     * (Google's API reports an exclusive end date; we normalise it here).
     */
    end?: string;
    allDay?: boolean;
    location?: string;
    description: string;
    /** Link back to the event in Google Calendar. */
    htmlLink?: string;
    image?: string;
};

// --- Google Calendar API shapes -------------------------------------------

export type GCalDate = { dateTime?: string; date?: string; timeZone?: string };

export type GCalAttachment = {
    fileId?: string;
    fileUrl?: string;
    title?: string;
    mimeType?: string;
    iconLink?: string;
};

export type GCalEvent = {
    id: string;
    status?: string;
    /** 'default' | 'public' | 'private' | 'confidential'. */
    visibility?: string;
    summary?: string;
    description?: string;
    location?: string;
    htmlLink?: string;
    start: GCalDate;
    end: GCalDate;
    attachments?: GCalAttachment[];
};

/**
 * True when an event should be shown publicly. Events marked "private" or
 * "confidential" in Google Calendar come back with their details stripped when
 * read via an API key, so we hide them entirely rather than show an empty slot.
 */
export function isPublicEvent(ev: GCalEvent): boolean {
    return ev.visibility !== 'private' && ev.visibility !== 'confidential';
}

/**
 * Build a directly-embeddable image URL from the first image attachment on an
 * event. Google Drive attachment URLs point at a viewer page, not the raw
 * image, so we use the thumbnail endpoint (which serves an actual image and
 * works for any Drive file shared as "Anyone with the link"). Events without
 * an image attachment simply get no image.
 */
function attachmentImageUrl(attachments?: GCalAttachment[]): string | undefined {
    const img = attachments?.find(a => a.fileId && a.mimeType?.startsWith('image/'));
    if (!img?.fileId) return undefined;
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(img.fileId)}&sz=w1600`;
}

function toDateString(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

/** Convert a Google Calendar event into our normalised `EventItem`. */
export function normalizeEvent(ev: GCalEvent): EventItem {
    const allDay = !ev.start.dateTime;

    let start: string;
    let end: string | undefined;

    if (allDay) {
        start = ev.start.date ?? '';
        if (ev.end?.date) {
            // Google's all-day end date is exclusive; step back one day so it
            // represents the inclusive final day the event runs.
            const [y, m, d] = ev.end.date.split('-').map(Number);
            end = toDateString(new Date(y, m - 1, d - 1));
        }
    } else {
        start = ev.start.dateTime ?? '';
        end = ev.end?.dateTime;
    }

    return {
        id: ev.id,
        title: ev.summary ?? '(untitled event)',
        start,
        end,
        allDay,
        location: ev.location,
        description: ev.description ?? '',
        htmlLink: ev.htmlLink,
        image: attachmentImageUrl(ev.attachments),
    };
}

// --- Date helpers ----------------------------------------------------------

/** True when the string is an all-day `YYYY-MM-DD` date (no time component). */
export function isAllDayString(s: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

/**
 * Parse an event date string into a `Date`. All-day strings are parsed in the
 * local timezone (not UTC) so the day never drifts across a date boundary.
 */
export function toDate(s: string): Date {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return new Date(s);
}

// --- Display formatting ----------------------------------------------------

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dateOpts: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
};
const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
const shortOpts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };

export function formatDateBadge(iso: string) {
    const d = toDate(iso);
    return { month: MONTHS[d.getMonth()], day: d.getDate() };
}

/** Full "when" line for the detail page. */
export function formatTimeRange(start: string, end?: string) {
    const s = toDate(start);
    const dateStr = s.toLocaleDateString('en-AU', dateOpts);

    if (isAllDayString(start)) {
        if (!end || start === end) return `${dateStr} · All day`;
        const e = toDate(end);
        return `${dateStr} → ${e.toLocaleDateString('en-AU', dateOpts)}`;
    }

    const startTime = s.toLocaleTimeString('en-AU', timeOpts);
    if (!end) return `${dateStr}, ${startTime}`;

    const e = toDate(end);
    if (s.toDateString() === e.toDateString()) {
        return `${dateStr}, ${startTime} – ${e.toLocaleTimeString('en-AU', timeOpts)}`;
    }
    return `${dateStr}, ${startTime} → ${e.toLocaleDateString('en-AU', dateOpts)}, ${e.toLocaleTimeString('en-AU', timeOpts)}`;
}

/** Compact "when" line for list/preview cards. */
export function formatShortWhen(start: string, end?: string) {
    const s = toDate(start);

    if (isAllDayString(start)) {
        if (!end || start === end) return 'All day';
        const e = toDate(end);
        return `${s.toLocaleDateString('en-AU', shortOpts)} → ${e.toLocaleDateString('en-AU', shortOpts)}`;
    }

    const startTime = s.toLocaleTimeString('en-AU', timeOpts);
    if (!end) return startTime;

    const e = toDate(end);
    if (s.toDateString() === e.toDateString()) {
        return `${startTime} – ${e.toLocaleTimeString('en-AU', timeOpts)}`;
    }
    return `${s.toLocaleDateString('en-AU', shortOpts)} → ${e.toLocaleDateString('en-AU', shortOpts)}`;
}
