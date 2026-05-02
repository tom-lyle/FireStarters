import { contactContent } from './Contact.content';
import './Contact.css';

export default function Contact() {
    const { heading, lead, items } = contactContent;

    return (
        <section className="page page--contact">
            <h2>{heading}</h2>
            <p className="lead">{lead}</p>

            <ul className="contact-list">
                {items.map(item => (
                    <li key={item.label}>
                        <span className="contact-label">{item.label}</span>
                        <a
                            href={item.href}
                            {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}
