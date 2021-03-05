import React from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/LoginScreen.scss';
import FormContainer from './../components/FormContainer';

const LoginScreen = () => {
  return (
    <Container className='login__screen__container'>
      <FormContainer>
        <h1 className='py-4 login__screen__heading'>Sign In</h1>
        <Form className='default-font'>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className='default-font login__screen__input'
              type='email'
              placeholder='Email'
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='password'
              placeholder='Password'
              required
            ></Form.Control>
          </Form.Group>
          <Button variant='dark' className='default-font px-5 py-3 my-4'>
            Sign In
          </Button>
        </Form>

        <Row className='default-font'>
          <Col>
            New Customer?
            <Link to='/register' className='text-dark px-2'>
              <strong>Register</strong>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
