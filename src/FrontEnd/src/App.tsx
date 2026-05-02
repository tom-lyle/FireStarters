import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Events from './Pages/Events/Events';
import EventDetail from './Pages/EventDetail/EventDetail';
import Contact from './Pages/Contact/Contact';
import Community from './Pages/Community/Community';
import NoPage from './Pages/NoPage/NoPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="events" element={<Events />} />
                    <Route path="events/:id" element={<EventDetail />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="community" element={<Community />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
