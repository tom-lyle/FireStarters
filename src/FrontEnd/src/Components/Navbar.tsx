import { Container, Nav, Navbar } from 'react-bootstrap'

export default function FSNavbar() {
    return (
        <>
            <Navbar data-bs-theme="dark" id='mainNavBar'>
                <Container>
                    <Navbar.Brand href="/">FireStarters</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/events">Events</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
