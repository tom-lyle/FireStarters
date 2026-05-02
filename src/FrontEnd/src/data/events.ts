export type EventItem = {
    id: string;
    title: string;
    start: string;
    end?: string;
    location?: string;
    description: string;
    image?: string;
};

export const events: EventItem[] = [
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
        image: '/images/coffee-volleyball.jpeg',
    },
    {
        id: 'alive-praise-night',
        title: 'ALIVE Praise Night',
        start: '2025-10-30T19:00:00+11:00',
        end: '2025-10-30T21:00:00+11:00',
        location: 'Collins Wing, St Benedicts RC Church',
        description:
            "Young adults gather for praise, worship and fellowship at Collins Wing, St Benedict's Narrabundah.",
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

export function getEvent(id: string): EventItem | undefined {
    return events.find(e => e.id === id);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDateBadge(iso: string) {
    const d = new Date(iso);
    return { month: MONTHS[d.getMonth()], day: d.getDate() };
}

export function formatTimeRange(start: string, end?: string) {
    const dateOpts: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    const s = new Date(start);
    const dateStr = s.toLocaleDateString('en-AU', dateOpts);
    const startTime = s.toLocaleTimeString('en-AU', timeOpts);
    if (!end) return `${dateStr}, ${startTime}`;
    const e = new Date(end);
    const sameDay = s.toDateString() === e.toDateString();
    if (sameDay) {
        const endTime = e.toLocaleTimeString('en-AU', timeOpts);
        return `${dateStr}, ${startTime} – ${endTime}`;
    }
    const endStr = e.toLocaleDateString('en-AU', dateOpts);
    return `${dateStr}, ${startTime} → ${endStr}, ${e.toLocaleTimeString('en-AU', timeOpts)}`;
}

export function formatShortWhen(start: string, end?: string) {
    const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' };
    const s = new Date(start);
    const startTime = s.toLocaleTimeString('en-AU', timeOpts);
    if (!end) return startTime;
    const e = new Date(end);
    const sameDay = s.toDateString() === e.toDateString();
    if (sameDay) {
        return `${startTime} – ${e.toLocaleTimeString('en-AU', timeOpts)}`;
    }
    const endShort: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return `${startTime} → ${e.toLocaleDateString('en-AU', endShort)}`;
}
