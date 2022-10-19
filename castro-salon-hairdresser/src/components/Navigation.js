import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Hamburger from '../images/hamburger.png'



function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMuUIFk0w4Agm7EVuAws8T1CIQMvVqUxJo7A&usqp=CAU" alt="logo" className='avatar '/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <img src={Hamburger} alt="hamburger-nav" className="avatar-small" />
          </Navbar.Toggle>
          </Container>

          <Container className="mx-5">

            <Navbar.Collapse id="responsive-navbar-nav"  >
              <Nav className="pattaya text-center" >
                <Nav.Link href="/" className='mx-5'>Acceuil</Nav.Link>
                <Nav.Link href="/gallerie" className='mx-5'>Gallerie</Nav.Link>
                <Nav.Link href="/contact" className='mx-5'>Contact</Nav.Link>
                <Nav.Link href="/login" className='mx-5'>Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
