import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import '../styles/Header.scss';

const Header = ({ location }) => {
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset >= 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <header
      className={
        location.pathname === '/'
          ? 'header__navbar header__navbar__home-screen'
          : scrolled === false
          ? 'header__navbar header__navbar__normal-screen'
          : 'header__navbar header__navbar__normal-screen header__navbar__normal-screen__scrolled'
      }
    >
      <Container>
        <Navbar
          collapseOnSelect
          expand='lg'
          variant={location.pathname !== '/' ? 'light' : 'dark'}
        >
          <LinkContainer to='/'>
            <Navbar.Brand className='navbar__brand'>
              <span
                className={
                  location.pathname === '/'
                    ? 'brand-name-primary__home-screen'
                    : 'brand-name-primary__normal-screen'
                }
              >
                Book
              </span>
              <span
                className={
                  location.pathname === '/'
                    ? 'brand-name-secondary__home-screen'
                    : 'brand-name-secondary__normal-screen'
                }
              >
                It
              </span>
            </Navbar.Brand>
          </LinkContainer>

          {location.pathname !== '/' && <SearchBox />}

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='nav ml-auto'>
              {userInfo && userInfo.name ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <NavDropdown.Item className='smaller-font'>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className='smaller-font'
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to='/login'
                  className={
                    location.pathname === '/' ? 'text-light' : 'text-dark'
                  }
                >
                  <Nav.Link>SignIn</Nav.Link>
                </LinkContainer>
              )}
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
