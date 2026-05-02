export type NavLinkItem = {
    to: string;
    label: string;
};

export const navbarContent = {
    brand: { label: 'FireStarters CBR', to: '/' },
    links: [
        { to: '/', label: 'Home' },
        { to: '/community', label: 'Community' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/events', label: 'Events' },
    ] satisfies NavLinkItem[],
};
