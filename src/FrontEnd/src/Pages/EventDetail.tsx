import { Link, useParams } from 'react-router-dom';
import { getEvent, formatTimeRange } from '../data/events';

export default function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const event = id ? getEvent(id) : undefined;

    if (!event) {
        return (
            <section className="page page--event-detail">
                <h2>Event not found</h2>
                <p>That event doesn't exist or has been removed.</p>
                <Link to="/events" className="btn btn-solid">Back to events</Link>
            </section>
        );
    }

    return (
        <section className="page page--event-detail">
            <div className="event-back-bar">
                <Link to="/events" className="event-back">‹ Back to events</Link>
            </div>

            <h2>{event.title}</h2>

            <p className="event-when">{formatTimeRange(event.start, event.end)}</p>
            {event.location && <p className="event-where">{event.location}</p>}

            {event.image && (
                <img
                    src={event.image}
                    alt={event.title}
                    className="event-detail-image"
                />
            )}

            <p className="event-detail-desc">{event.description}</p>

            <div className="event-detail-cta">
                <Link to="/contact" className="btn btn-solid">Get in touch</Link>
            </div>
        </section>
    );
}
