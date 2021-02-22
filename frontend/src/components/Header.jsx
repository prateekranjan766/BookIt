import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import '../styles/Header.scss';

const Header = ({ location }) => {
  console.log(location);
  return (
    <header
      className={
        location.pathname === '/'
          ? 'header__navbar header__navbar__home-screen'
          : 'header__navbar header__navbar__normal-screen'
      }
    >
      <Container>
        <Navbar variant='dark' collapseOnSelect expand='lg'>
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar__brand'>
              <span style={{ color: '#4F879D', fontWeight: '500' }}>Book</span>
              <span style={{ color: '#fff' }}>It</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto nav'>
              <LinkContainer to='/login'>
                <Nav.Link>SignIn</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>
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
    </header>
  );
};

export default Header;
