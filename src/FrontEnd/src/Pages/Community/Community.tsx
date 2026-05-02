import { communityContent } from './Community.content';
import './Community.css';

export default function Community() {
    const { heading, lead, communities } = communityContent;

    return (
        <section className="page page--community">
            <h2>{heading}</h2>
            <p className="lead">{lead}</p>

            <div className="community-grid">
                {communities.map(c => (
                    <article key={c.name} className="community-card">
                        <h3>{c.name}</h3>
                        <p>{c.description}</p>
                        <p className="when">{c.when}</p>
                        {c.instagram && (
                            <a href={c.instagram} target="_blank" rel="noreferrer">Instagram</a>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
