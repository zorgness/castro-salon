import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuUIFk0w4Agm7EVuAws8T1CIQMvVqUxJo7A&usqp=CAU" alt="logo" className='avatar'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          </Container>

          <Container className="mx-5">

            <Navbar.Collapse id="responsive-navbar-nav"  >
              <Nav className="">
                <Nav.Link href="/">Acceuil</Nav.Link>
                <Nav.Link href="/gallerie">Gallerie</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
