export default function Contact() {
    return (
        <section className="page page--contact">
            <h2>Contact Us</h2>
            <p className="lead">We want to hear from you!</p>

            <ul className="contact-list">
                <li>
                    <span className="contact-label">Email</span>
                    <a href="mailto:firestarterscbr@gmail.com">firestarterscbr@gmail.com</a>
                </li>
                <li>
                    <span className="contact-label">Instagram</span>
                    <a
                        href="https://www.instagram.com/firestarterscbr"
                        target="_blank"
                        rel="noreferrer"
                    >
                        @FireStartersCBR
                    </a>
                </li>
            </ul>
        </section>
    );
}
