import React from 'react';
import { Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Row className='default-font'>
        <Col>
          {step1 ? (
            <LinkContainer to='/login' className='text-dark'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Col>
        <Col>
          {step2 ? (
            <LinkContainer to='/shipping' className='text-dark'>
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping</Nav.Link>
          )}
        </Col>
        <Col>
          {step3 ? (
            <LinkContainer to='/paymentMethod' className='text-dark'>
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Payment</Nav.Link>
          )}
        </Col>
        <Col>
          {step4 ? (
            <LinkContainer to='/placeOrder' className='text-dark'>
              <Nav.Link>Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Order</Nav.Link>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CheckoutSteps;
