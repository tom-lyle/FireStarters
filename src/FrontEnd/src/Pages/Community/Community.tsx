type Community = {
    name: string;
    description: string;
    when: string;
    instagram?: string;
};

const communities: Community[] = [
    {
        name: 'Quake',
        description: 'Young Adults Prayer, Worship and Intercession',
        when: '5pm Saturdays @ YWAM Canberra',
        instagram: 'https://www.instagram.com/',
    },
];

export default function Community() {
    return (
        <section className="page page--community">
            <h2>Communities</h2>
            <p className="lead">Many communities gather regularly — get connected here!</p>

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
