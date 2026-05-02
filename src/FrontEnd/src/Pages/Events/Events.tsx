import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useParallax } from '../Components/useParallax';
import { events, formatDateBadge, formatShortWhen } from '../data/events';

export default function Events() {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const bannerBgRef = useRef<HTMLDivElement | null>(null);
    useParallax(bannerRef, bannerBgRef);

    return (
        <section className="page page--events">
            <div ref={bannerRef} className="events-banner">
                <div
                    ref={bannerBgRef}
                    className="events-banner-bg"
                    style={{ backgroundImage: 'url(/images/events-header.jpg)' }}
                />
                <div className="events-banner-overlay" />
                <h2>Upcoming events</h2>
            </div>

            <ul className="event-preview-list">
                {events.map(ev => {
                    const badge = formatDateBadge(ev.start);
                    return (
                        <li key={ev.id}>
                            <Link to={`/events/${ev.id}`} className="event-preview">
                                <div className="event-date" aria-hidden>
                                    <span className="event-date__month">{badge.month}</span>
                                    <span className="event-date__day">{badge.day}</span>
                                </div>
                                <div className="event-preview__body">
                                    <h3>{ev.title}</h3>
                                    <p className="event-preview__when">
                                        {formatShortWhen(ev.start, ev.end)}
                                    </p>
                                </div>
                                <span className="event-preview__chev" aria-hidden>›</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
