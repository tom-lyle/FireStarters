import { useRef } from 'react';
import { Link } from 'react-router-dom';
import EventCalendar from '../Components/EventCalendar';
import { useParallax } from '../Components/useParallax';

export default function Home() {
    const heroRef = useRef<HTMLElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);
    useParallax(heroRef, bgRef);

    return (
        <>
            <section ref={heroRef} className="hero">
                <div
                    ref={bgRef}
                    className="hero-bg"
                    style={{ backgroundImage: 'url(/images/hero.jpg)' }}
                />
                <div className="hero-overlay" />
                <div className="hero-content">
                    <h1>FireStarters <span>CBR</span></h1>
                    <p className="tagline">
                        Your home page to connect with the Canberra Christian community
                    </p>
                    <div className="hero-cta">
                        <Link to="/contact" className="btn btn-solid">Contact</Link>
                        <Link to="/contact" className="btn btn-outline">Register Event</Link>
                    </div>
                </div>
            </section>

            <section className="home-calendar">
                <h2>What's on</h2>
                <p className="lead">
                    Browse upcoming gatherings across Canberra. Click any day for details.
                </p>
                <EventCalendar />
            </section>
        </>
    );
}
