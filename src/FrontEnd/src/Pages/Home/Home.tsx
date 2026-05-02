import { useRef } from 'react';
import EventCalendar from '../../Components/EventCalendar';
import { useParallax } from '../../Components/useParallax';
import { homeContent } from './Home.content';
import './Home.css';

export default function Home() {
    const heroRef = useRef<HTMLElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);
    useParallax(heroRef, bgRef);

    const { hero, calendar } = homeContent;

    return (
        <>
            <section ref={heroRef} className="hero">
                <div
                    ref={bgRef}
                    className="hero-bg"
                    style={{ backgroundImage: `url(${hero.backgroundImage})` }}
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <h1>{hero.title} <span>{hero.titleSuffix}</span></h1>
                    <p className="tagline">{hero.tagline}</p>
                </div>
            </section>

            <section className="home-calendar">
                <h2>{calendar.heading}</h2>
                <p className="lead">{calendar.lead}</p>
                <EventCalendar />
            </section>
        </>
    );
}
