import { Link, useParams } from 'react-router-dom';
import { getEvent, formatTimeRange } from '../../data/events';
import { eventDetailContent } from './EventDetail.content';
import './EventDetail.css';

export default function EventDetail() {
    const { id } = useParams<{ id: string }>();
    const event = id ? getEvent(id) : undefined;

    if (!event) {
        const { notFound } = eventDetailContent;
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

    const { backLabel, cta } = eventDetailContent;

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
                />
            )}

            <p className="event-detail-desc">{event.description}</p>

            <div className="event-detail-cta">
                <Link to={cta.to} className="btn btn-solid">{cta.label}</Link>
            </div>
        </section>
    );
}
