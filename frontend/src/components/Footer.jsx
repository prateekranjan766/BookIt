import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row style={{ padding: '10rem 0 8rem 0' }}>
          <Col>
            <span
              style={{ color: '#4F879D', fontWeight: '500', fontSize: '4rem' }}
            >
              Book
            </span>
            <span
              className='default-font'
              style={{ color: '#fff', fontSize: '4rem' }}
            >
              It
            </span>
          </Col>
          <Col
            md={6}
            style={{ display: 'block' }}
            className='ml-auto py-4 text-right'
          >
            <a href='#' className='footer_link'>
              Our Promise
            </a>
            <a href='#' className='footer_link'>
              Contact
            </a>
            <a href='#' className='footer_link'>
              Help & FAQ
            </a>
            <a href='#' className='footer_link'>
              Terms
            </a>
          </Col>
        </Row>
        <Row>
          <p className='copyright__text'>Copyright © BookIt 2021</p>
        </Row>
        <Row className='icon__section m-4'>
          <i className='fab fa-facebook-square footer__icon'></i>
          <i className='fab fa-instagram footer__icon'></i>
          <i className='fas fa-envelope footer__icon'></i>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
