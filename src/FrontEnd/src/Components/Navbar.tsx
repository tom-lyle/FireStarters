import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { navbarContent } from './Navbar.content';
import './Navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { brand, links } = navbarContent;

    return (
        <header id="mainNavBar">
            <div className="nav-inner">
                <Link to={brand.to} className="brand" onClick={() => setOpen(false)}>
                    {brand.label}
                </Link>

                <nav className="nav-links nav-links--desktop">
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    className="nav-toggle"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen(o => !o)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            <nav
                className={'nav-links nav-links--mobile' + (open ? ' is-open' : '')}
                aria-hidden={!open}
            >
                {links.map(l => (
                    <NavLink
                        key={l.to}
                        to={l.to}
                        end={l.to === '/'}
                        className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                        onClick={() => setOpen(false)}
                        tabIndex={open ? 0 : -1}
                    >
                        {l.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
