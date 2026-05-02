import { Link } from 'react-router-dom';
import { noPageContent } from './NoPage.content';
import './NoPage.css';

export default function NoPage() {
    const { heading, body, cta } = noPageContent;

    return (
        <section className="page page--404">
            <h2>{heading}</h2>
            <p>{body}</p>
            <Link to={cta.to} className="btn btn-solid">{cta.label}</Link>
        </section>
    );
}
