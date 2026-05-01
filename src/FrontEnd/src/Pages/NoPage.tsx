import { Link } from 'react-router-dom';

export default function NoPage() {
    return (
        <section className="page page--404">
            <h2>Page not found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-solid">Back to home</Link>
        </section>
    );
}
