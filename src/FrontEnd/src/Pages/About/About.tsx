import { Link } from 'react-router-dom';

export default function About() {
    return (
        <section className="page page--about">
            <h2>Who Are We?</h2>

            <img
                src="/images/about.png"
                alt="FireStarters CBR"
                className="page-image"
            />

            <p>
                FireStarters is a community-building ministry dedicated to unifying young
                adults across Canberra. We believe our city has incredible potential when we
                create intentional spaces for people to connect, grow, and support each other
                through life's journey.
            </p>

            <p>
                We want to foster genuine relationships that transform our community from the
                inside out. We do this through quarterly large-scale gatherings that bring the
                broader community together, complemented by smaller, more intimate gatherings
                focused on building authentic relationships and providing practical support.
            </p>

            <p>
                FireStarters serves as a hub for discovering what's happening across Canberra
                for young adults. Whether hosted by local churches, community groups, or other
                organizations, we want to help you find your place in our vibrant city.
            </p>

            <p>
                We're passionate about ensuring no one walks alone — whether you're new to
                Canberra, exploring faith for the first time, or simply looking for meaningful
                connection. FireStarters is here to help you discover community, find support,
                and experience the strength that comes from walking together.
            </p>

            <div className="about-contact">
                <h3>Contact us</h3>
                <p>
                    Interested in working together? Fill out some info and we will be in touch
                    shortly. We can't wait to hear from you!
                </p>
                <Link to="/contact" className="btn btn-solid">Get in touch</Link>
            </div>
        </section>
    );
}
