import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Graph solver</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to={'/'}>
                        <Nav.Link>Projects</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/outputs'}>
                        <Nav.Link>Outputs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={'/new-project'}>
                        <Nav.Link>New Project</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Navigation;