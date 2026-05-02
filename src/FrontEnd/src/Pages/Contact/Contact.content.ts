export type ContactItem = {
    label: string;
    href: string;
    text: string;
    external?: boolean;
};

export const contactContent = {
    heading: 'Contact Us',
    lead: 'We want to hear from you!',
    items: [
        {
            label: 'Email',
            href: 'mailto:firestarterscbr@gmail.com',
            text: 'firestarterscbr@gmail.com',
        },
        {
            label: 'Instagram',
            href: 'https://www.instagram.com/firestarterscbr',
            text: '@FireStartersCBR',
            external: true,
        },
    ] satisfies ContactItem[],
};
