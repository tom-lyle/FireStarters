import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function FSNavbar() {
    return (
        <>
            <Navbar data-bs-theme="dark" id='mainNavBar'>
                <Container>
                    <Navbar.Brand as={NavLink} to="/">FireStarters</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}