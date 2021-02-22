import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Container>
      <Navbar variant='dark' collapseOnSelect expand='lg'>
        <Navbar.Brand className='navbar__brand' href='#home'>
          <span style={{ color: '#4F879D', fontWeight: '500' }}>Book</span>
          <span style={{ color: '#fff' }}>It</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto nav'>
            <Nav.Link href='#home'>Authors</Nav.Link>
            <Nav.Link href='#link'>Novels</Nav.Link>
            <Nav.Link href='#home'>Comics</Nav.Link>
            <Nav.Link href='#link'>Biography</Nav.Link>
            <Nav.Link href='#link'>Educational</Nav.Link>
            {/* <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
