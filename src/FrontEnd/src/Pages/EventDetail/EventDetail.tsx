import { Link, useParams } from 'react-router-dom';
import { formatTimeRange } from '../../data/events';
import { useCalendarEvent } from '../../data/useCalendarEvents';
import { eventDetailContent } from './EventDetail.content';
import './EventDetail.css';

export default function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const { event, loading, error } = useCalendarEvent(id);
    const { backLabel, cta, notFound } = eventDetailContent;

    if (loading) {
        return (
            <section className="page page--event-detail">
                <div className="event-back-bar">
                    <Link to="/events" className="event-back">{backLabel}</Link>
                </div>
                <p className="events-status">Loading event…</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page page--event-detail">
                <div className="event-back-bar">
                    <Link to="/events" className="event-back">{backLabel}</Link>
                </div>
                <p className="events-status events-status--error">{error}</p>
            </section>
        );
    }

    if (!event) {
        return (
            <section className="page page--event-detail">
                <h2>{notFound.heading}</h2>
                <p>{notFound.body}</p>
                <Link to={notFound.cta.to} className="btn btn-solid">
                    {notFound.cta.label}
                </Link>
            </section>
        );
    }

    return (
        <section className="page page--event-detail">
            <div className="event-back-bar">
                <Link to="/events" className="event-back">{backLabel}</Link>
            </div>

            <h2>{event.title}</h2>

            <p className="event-when">{formatTimeRange(event.start, event.end)}</p>
            {event.location && <p className="event-where">{event.location}</p>}

            {event.image && (
                <img
                    src={event.image}
                    alt={event.title}
                    className="event-detail-image"
                    loading="lazy"
                    onError={(e) => {
                        // Hide gracefully if the Drive file isn't publicly viewable.
                        e.currentTarget.style.display = 'none';
                    }}
                />
            )}

            {event.description && (
                <p className="event-detail-desc">{event.description}</p>
            )}

            <div className="event-detail-cta">
                {event.htmlLink && (
                    <a
                        href={event.htmlLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline"
                    >
                        Add to your calendar
                    </a>
                )}
                <Link to={cta.to} className="btn btn-solid">{cta.label}</Link>
            </div>
        </section>
    );
}
