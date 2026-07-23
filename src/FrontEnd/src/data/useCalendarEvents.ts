import { useEffect, useState } from 'react';
import { normalizeEvent, type EventItem, type GCalEvent } from './events';

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;

/** Whether the Google Calendar env vars are present. */
export const calendarConfigured = Boolean(CALENDAR_ID && API_KEY);

const NOT_CONFIGURED =
    'Calendar not configured. Set VITE_GOOGLE_CALENDAR_ID and VITE_GOOGLE_API_KEY.';

const API_BASE = 'https://www.googleapis.com/calendar/v3/calendars';

function startOfToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function addYears(d: Date, years: number) {
    return new Date(d.getFullYear() + years, d.getMonth(), d.getDate());
}

function hasStart(ev: GCalEvent) {
    return Boolean(ev.start && (ev.start.dateTime || ev.start.date));
}

// --- List of events --------------------------------------------------------

type ListState = { events: EventItem[]; loading: boolean; error: string | null };

/**
 * Fetch events from Google Calendar within a time window. Defaults to
 * upcoming events (from the start of today, one year ahead). Recurring events
 * are expanded and results are ordered by start time.
 */
export function useCalendarEvents(opts?: { timeMin?: Date; timeMax?: Date }): ListState {
    const minMs = opts?.timeMin?.getTime();
    const maxMs = opts?.timeMax?.getTime();

    const [state, setState] = useState<ListState>({
        events: [],
        loading: calendarConfigured,
        error: calendarConfigured ? null : NOT_CONFIGURED,
    });

    useEffect(() => {
        if (!CALENDAR_ID || !API_KEY) {
            setState({ events: [], loading: false, error: NOT_CONFIGURED });
            return;
        }

        const controller = new AbortController();
        const timeMin = minMs !== undefined ? new Date(minMs) : startOfToday();
        const timeMax = maxMs !== undefined ? new Date(maxMs) : addYears(timeMin, 1);

        const url =
            `${API_BASE}/${encodeURIComponent(CALENDAR_ID)}/events` +
            `?key=${encodeURIComponent(API_KEY)}` +
            `&timeMin=${encodeURIComponent(timeMin.toISOString())}` +
            `&timeMax=${encodeURIComponent(timeMax.toISOString())}` +
            `&singleEvents=true&orderBy=startTime&maxResults=250`;

        setState(s => ({ ...s, loading: true, error: null }));

        fetch(url, { signal: controller.signal })
            .then(async r => {
                if (!r.ok) {
                    const body = await r.text();
                    throw new Error(`Google Calendar API ${r.status}: ${body.slice(0, 200)}`);
                }
                return r.json();
            })
            .then((data: { items?: GCalEvent[] }) => {
                const events = (data.items ?? []).filter(hasStart).map(normalizeEvent);
                setState({ events, loading: false, error: null });
            })
            .catch((e: unknown) => {
                if (e instanceof DOMException && e.name === 'AbortError') return;
                setState({ events: [], loading: false, error: (e as Error).message });
            });

        return () => controller.abort();
    }, [minMs, maxMs]);

    return state;
}

// --- Single event ----------------------------------------------------------

type SingleState = { event: EventItem | null; loading: boolean; error: string | null };

/** Fetch a single event by id (used by the event detail page). */
export function useCalendarEvent(id: string | undefined): SingleState {
    const [state, setState] = useState<SingleState>({
        event: null,
        loading: Boolean(id) && calendarConfigured,
        error: id && !calendarConfigured ? NOT_CONFIGURED : null,
    });

    useEffect(() => {
        if (!id) {
            setState({ event: null, loading: false, error: null });
            return;
        }
        if (!CALENDAR_ID || !API_KEY) {
            setState({ event: null, loading: false, error: NOT_CONFIGURED });
            return;
        }

        const controller = new AbortController();
        const url =
            `${API_BASE}/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(id)}` +
            `?key=${encodeURIComponent(API_KEY)}`;

        setState({ event: null, loading: true, error: null });

        fetch(url, { signal: controller.signal })
            .then(async r => {
                // A missing or removed event reads as "not found", not an error.
                if (r.status === 404 || r.status === 410) return null;
                if (!r.ok) {
                    const body = await r.text();
                    throw new Error(`Google Calendar API ${r.status}: ${body.slice(0, 200)}`);
                }
                return r.json() as Promise<GCalEvent>;
            })
            .then(data => {
                const event = data && data.status !== 'cancelled' ? normalizeEvent(data) : null;
                setState({ event, loading: false, error: null });
            })
            .catch((e: unknown) => {
                if (e instanceof DOMException && e.name === 'AbortError') return;
                setState({ event: null, loading: false, error: (e as Error).message });
            });

        return () => controller.abort();
    }, [id]);

    return state;
}
