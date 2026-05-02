import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { footerContent } from './Footer.content';
import './Footer.css';

export default function Footer() {
    const { brand, ctas, social } = footerContent;

    return (
        <footer id="mainFooter">
            <div className="footer-inner">
                <div className="footer-cta">
                    {ctas.map(cta => (
                        <Link key={cta.label} to={cta.to} className="btn btn-outline">
                            {cta.label}
                        </Link>
                    ))}
                </div>

                <div className="footer-brand">{brand}</div>

                <div className="footer-social">
                    {social.map((item, i) => (
                        <Fragment key={item.label}>
                            {i > 0 && <span className="sep">|</span>}
                            <a
                                href={item.href}
                                {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                            >
                                {item.label}
                            </a>
                        </Fragment>
                    ))}
                </div>
            </div>
        </footer>
    );
}
