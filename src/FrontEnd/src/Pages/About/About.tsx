import { Link } from 'react-router-dom';
import { aboutContent } from './About.content';
import './About.css';

export default function About() {
    const { heading, image, paragraphs, contact } = aboutContent;

    return (
        <section className="page page--about">
            <h2>{heading}</h2>

            <img src={image.src} alt={image.alt} className="page-image" />

            {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
            ))}

            <div className="about-contact">
                <h3>{contact.heading}</h3>
                <p>{contact.body}</p>
                <Link to={contact.cta.to} className="btn btn-solid">
                    {contact.cta.label}
                </Link>
            </div>
        </section>
    );
}
