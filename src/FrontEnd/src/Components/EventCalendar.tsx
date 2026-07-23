import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import { useCalendarEvents } from '../data/useCalendarEvents';
import { toDate, type EventItem } from '../data/events';
import './EventCalendar.css';

function dayKey(d: Date) {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function* daysBetween(start: Date, end: Date) {
    const cur = startOfDay(start);
    const last = startOfDay(end);
    while (cur <= last) {
        yield new Date(cur);
        cur.setDate(cur.getDate() + 1);
    }
}

export default function EventCalendar() {
    const today = useMemo(() => new Date(), []);
    const [activeMonth, setActiveMonth] = useState<Date>(
        () => new Date(today.getFullYear(), today.getMonth(), 1),
    );
    const [selected, setSelected] = useState<Date>(today);

    // Fetch a window spanning the month before and after the visible month so
    // multi-day events overlapping the edges still show.
    const timeMin = useMemo(
        () => new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1),
        [activeMonth],
    );
    const timeMax = useMemo(
        () => new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 2, 0, 23, 59, 59),
        [activeMonth],
    );

    const { events, loading, error } = useCalendarEvents({ timeMin, timeMax });

    const eventsByDay = useMemo(() => {
        const map = new Map<string, EventItem[]>();
        for (const ev of events) {
            const s = toDate(ev.start);
            const e = ev.end ? toDate(ev.end) : s;
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
                        {selectedEvents.map(ev => (
                            <li key={ev.id} className="calendar-event">
                                <Link to={`/events/${ev.id}`} className="calendar-event__link">
                                    <div className="calendar-event__title">{ev.title}</div>
                                    <div className="calendar-event__when">
                                        {ev.allDay
                                            ? 'All day'
                                            : toDate(ev.start).toLocaleTimeString('en-AU', {
                                                  hour: 'numeric',
                                                  minute: '2-digit',
                                              })}
                                    </div>
                                    {ev.location && (
                                        <div className="calendar-event__where">{ev.location}</div>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
