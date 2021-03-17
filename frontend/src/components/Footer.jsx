import React from 'react';
import { Row, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <p className='copyright__text'>
            Build and Designed by Prateek Ranjan
          </p>
        </Row>
        <Row>
          <p className='copyright__text'>Copyright © BOOkit 2021</p>
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
