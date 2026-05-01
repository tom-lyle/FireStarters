import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer id="mainFooter">
            <div className="footer-inner">
                <div className="footer-cta">
                    <Link to="/contact" className="btn btn-outline">Contact</Link>
                    <Link to="/contact" className="btn btn-outline">Register Event</Link>
                </div>

                <div className="footer-brand">FireStarters CBR</div>

                <div className="footer-social">
                    <a href="https://www.instagram.com/firestarterscbr" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                    <span className="sep">|</span>
                    <a href="mailto:firestarterscbr@gmail.com">Email</a>
                </div>
            </div>
        </footer>
    );
}
