import { useRef } from 'react';
import { useParallax } from '../Components/useParallax';

type EventItem = {
    id: string;
    title: string;
    start: string;
    end?: string;
    location?: string;
    description: string;
    image?: string;
};

const events: EventItem[] = [
    {
        id: 'youth-alive-academy-pop-up',
        title: 'Youth Alive Academy Pop Up',
        start: '2025-11-18T19:00:00+11:00',
        end: '2025-11-18T21:00:00+11:00',
        location: 'Life Unlimited Church, Canberra',
        description:
            'A pop-up night for youth pastors, leaders and potential students to discover how the Youth Alive Academy can help raise and equip the next generation of leaders.',
        image: '/images/youth-alive.jpeg',
    },
    {
        id: 'coffee-cup-volleyball',
        title: 'Coffee Cup — Volleyball',
        start: '2025-11-02T13:30:00+11:00',
        end: '2025-11-02T16:00:00+11:00',
        location: '24 White Crescent, Campbell ACT 2612',
        description:
            'Round two of The Coffee Cup! North vs South — who will come out on top on the volleyball courts?',
    },
    {
        id: 'alive-praise-night',
        title: 'ALIVE Praise Night',
        start: '2025-10-30T19:00:00+11:00',
        end: '2025-10-30T21:00:00+11:00',
        location: 'Collins Wing, St Benedicts RC Church',
        description:
            'Young adults gather for praise, worship and fellowship at Collins Wing, St Benedict\'s Narrabundah.',
        image: '/images/alive-praise.jpeg',
    },
    {
        id: 'love-canberra',
        title: 'Love Canberra',
        start: '2025-10-26T19:00:00+11:00',
        end: '2025-11-02T19:00:00+11:00',
        description: 'A city-wide outreach week.',
        image: '/images/love-canberra.png',
    },
    {
        id: 'spring-fair-ywam',
        title: 'Spring Fair — YWAM',
        start: '2025-10-12T14:00:00+11:00',
        end: '2025-10-12T17:00:00+11:00',
        location: 'YWAM Canberra',
        description:
            'A Spring Fair with stalls, music, a free sausage sizzle and fun all afternoon.',
        image: '/images/spring-fair.png',
    },
    {
        id: 'coffee-cup-soccer',
        title: 'Coffee Cup — Soccer',
        start: '2025-10-12T13:30:00+11:00',
        end: '2025-10-12T15:30:00+11:00',
        location: '167 Bugden Avenue, Fadden ACT 2904',
        description:
            'A battle of North vs South — sports, games and social events!',
        image: '/images/coffee-soccer.jpeg',
    },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDateBadge(iso: string) {
    const d = new Date(iso);
    return { month: MONTHS[d.getMonth()], day: d.getDate() };
}

function formatTimeRange(start: string, end?: string) {
    const opts: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    const s = new Date(start);
    const dateStr = s.toLocaleDateString('en-AU', opts);
    const startTime = s.toLocaleTimeString('en-AU', timeOpts);
    if (!end) return `${dateStr}, ${startTime}`;
    const e = new Date(end);
    const sameDay = s.toDateString() === e.toDateString();
    if (sameDay) {
        const endTime = e.toLocaleTimeString('en-AU', timeOpts);
        return `${dateStr}, ${startTime} – ${endTime}`;
    }
    const endStr = e.toLocaleDateString('en-AU', opts);
    return `${dateStr}, ${startTime} → ${endStr}, ${e.toLocaleTimeString('en-AU', timeOpts)}`;
}

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

            <div className="event-list">
                {events.map(ev => {
                    const badge = formatDateBadge(ev.start);
                    return (
                        <article key={ev.id} className="event">
                            <div className="event-date" aria-hidden>
                                <span className="event-date__month">{badge.month}</span>
                                <span className="event-date__day">{badge.day}</span>
                            </div>
                            <div className="event-body">
                                {ev.image && (
                                    <img
                                        src={ev.image}
                                        alt={ev.title}
                                        className="event-image"
                                        loading="lazy"
                                    />
                                )}
                                <h3>{ev.title}</h3>
                                <p className="event-when">{formatTimeRange(ev.start, ev.end)}</p>
                                {ev.location && <p className="event-where">{ev.location}</p>}
                                <p className="event-desc">{ev.description}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
