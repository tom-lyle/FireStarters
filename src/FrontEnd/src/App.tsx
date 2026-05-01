import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Events from './Pages/Events';
import Contact from './Pages/Contact';
import Community from './Pages/Community';
import NoPage from './Pages/NoPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="events" element={<Events />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="community" element={<Community />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
