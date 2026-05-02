import { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import './EventCalendar.css';

type GCalDate = { dateTime?: string; date?: string; timeZone?: string };

type GCalEvent = {
    id: string;
    summary?: string;
    description?: string;
    location?: string;
    htmlLink?: string;
    start: GCalDate;
    end: GCalDate;
};

type Props = {
    calendarId?: string;
    apiKey?: string;
};

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string | undefined;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string | undefined;

function dayKey(d: Date) {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function eventStart(ev: GCalEvent): Date | null {
    if (ev.start.dateTime) return new Date(ev.start.dateTime);
    if (ev.start.date) {
        const [y, m, d] = ev.start.date.split('-').map(Number);
        return new Date(y, m - 1, d);
    }
    return null;
}

function eventEnd(ev: GCalEvent): Date | null {
    if (ev.end.dateTime) return new Date(ev.end.dateTime);
    if (ev.end.date) {
        const [y, m, d] = ev.end.date.split('-').map(Number);
        // All-day end is exclusive — back off by one day for display.
        return new Date(y, m - 1, d - 1);
    }
    return null;
}

function* daysBetween(start: Date, end: Date) {
    const cur = startOfDay(start);
    const last = startOfDay(end);
    while (cur <= last) {
        yield new Date(cur);
        cur.setDate(cur.getDate() + 1);
    }
}

export default function EventCalendar({
    calendarId = CALENDAR_ID,
    apiKey = API_KEY,
}: Props) {
    const today = useMemo(() => new Date(), []);
    const [activeMonth, setActiveMonth] = useState<Date>(
        () => new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [selected, setSelected] = useState<Date>(today);
    const [events, setEvents] = useState<GCalEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!calendarId || !apiKey) {
            setError(
                'Calendar not configured. Set VITE_GOOGLE_CALENDAR_ID and VITE_GOOGLE_API_KEY.',
            );
            return;
        }

        const controller = new AbortController();
        const timeMin = new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1);
        const timeMax = new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 2, 0, 23, 59, 59);

        const url =
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events` +
            `?key=${encodeURIComponent(apiKey)}` +
            `&timeMin=${encodeURIComponent(timeMin.toISOString())}` +
            `&timeMax=${encodeURIComponent(timeMax.toISOString())}` +
            `&singleEvents=true&orderBy=startTime&maxResults=250`;

        setLoading(true);
        setError(null);

        fetch(url, { signal: controller.signal })
            .then(async r => {
                if (!r.ok) {
                    const body = await r.text();
                    throw new Error(`Google Calendar API ${r.status}: ${body.slice(0, 200)}`);
                }
                return r.json();
            })
            .then(data => setEvents(data.items ?? []))
            .catch(e => {
                if (e.name !== 'AbortError') setError(e.message);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [activeMonth, calendarId, apiKey]);

    const eventsByDay = useMemo(() => {
        const map = new Map<string, GCalEvent[]>();
        for (const ev of events) {
            const s = eventStart(ev);
            const e = eventEnd(ev) ?? s;
            if (!s || !e) continue;
            for (const day of daysBetween(s, e)) {
                const key = dayKey(day);
                const arr = map.get(key) ?? [];
                arr.push(ev);
                map.set(key, arr);
            }
        }
        return map;
    }, [events]);

    const selectedEvents = eventsByDay.get(dayKey(selected)) ?? [];

    return (
        <div id="calendar" className="event-calendar">
            <Calendar
                value={selected}
                onChange={(value) => {
                    if (value instanceof Date) setSelected(value);
                }}
                onActiveStartDateChange={({ activeStartDate, view }) => {
                    if (view === 'month' && activeStartDate) setActiveMonth(activeStartDate);
                }}
                view="month"
                tileContent={({ date, view }) => {
                    if (view !== 'month') return null;
                    const dayEvents = eventsByDay.get(dayKey(date));
                    if (!dayEvents || dayEvents.length === 0) return null;
                    return (
                        <div className="event-marker" aria-label={`${dayEvents.length} events`}>
                            {dayEvents.slice(0, 3).map((ev, i) => (
                                <span key={ev.id + i} className="event-dot" />
                            ))}
                            {dayEvents.length > 3 && (
                                <span className="event-more">+{dayEvents.length - 3}</span>
                            )}
                        </div>
                    );
                }}
            />

            <div className="calendar-events">
                <h3>
                    {selected.toLocaleDateString('en-AU', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </h3>

                {loading && <p className="muted">Loading events…</p>}
                {error && <p className="error">{error}</p>}

                {!loading && !error && selectedEvents.length === 0 && (
                    <p className="muted">No events scheduled.</p>
                )}

                {!loading && !error && selectedEvents.length > 0 && (
                    <ul className="calendar-event-list">
                        {selectedEvents.map(ev => {
                            const s = eventStart(ev);
                            const allDay = !ev.start.dateTime;
                            return (
                                <li key={ev.id} className="calendar-event">
                                    <div className="calendar-event__title">
                                        {ev.htmlLink ? (
                                            <a
                                                href={ev.htmlLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {ev.summary ?? '(no title)'}
                                            </a>
                                        ) : (
                                            ev.summary ?? '(no title)'
                                        )}
                                    </div>
                                    <div className="calendar-event__when">
                                        {allDay
                                            ? 'All day'
                                            : s?.toLocaleTimeString('en-AU', {
                                                  hour: 'numeric',
                                                  minute: '2-digit',
                                              })}
                                    </div>
                                    {ev.location && (
                                        <div className="calendar-event__where">{ev.location}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}
