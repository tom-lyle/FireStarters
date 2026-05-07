import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
    const location = useLocation();
    return (
        <div className="site">
            <Navbar />
            <main id="body">
                <div key={location.pathname} className="page-fade">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}
