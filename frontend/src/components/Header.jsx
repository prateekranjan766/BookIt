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
              {userInfo && userInfo.name && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='basic-nav-dropdown'>
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item className='smaller-font'>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item className='smaller-font'>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/bookList'>
                    <NavDropdown.Item className='smaller-font'>
                      Books
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo && userInfo.name ? (
                <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='smaller-font'>
                      <i className='fas fa-user-tie'></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/myorders'>
                    <NavDropdown.Item className='smaller-font'>
                      <i className='fas fa-list'></i> My Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    className='smaller-font'
                    onClick={() => dispatch(logout())}
                  >
                    <i className='fas fa-sign-out-alt'></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to='/login'
                  className={
                    location.pathname === '/' ? 'text-light' : 'text-dark'
                  }
                >
                  <Nav.Link>
                    <i className='fas fa-user'></i> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
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
