export type Community = {
    name: string;
    description: string;
    when: string;
    instagram?: string;
};

export const communityContent = {
    heading: 'Communities',
    lead: 'Many communities gather regularly — get connected here!',
    communities: [
        {
            name: 'Quake',
            description: 'Young Adults Prayer, Worship and Intercession',
            when: '5pm Saturdays @ YWAM Canberra',
            instagram: 'https://www.instagram.com/',
        },
    ] satisfies Community[],
};
