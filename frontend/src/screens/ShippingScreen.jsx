import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import FormContainer from './../components/FormContainer';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from './../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import '../styles/LoginScreen.scss';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, postalCode }));
    history.push('/paymentMethod');
  };

  return (
    <Container className='login__screen__container'>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1 className='py-4 login__screen__heading'>Shipping</h1>
        <Form className='default-font' onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              className='default-font login__screen__input'
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='text'
              placeholder='City'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='state'>
            <Form.Label>State</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='text'
              placeholder='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='text'
              placeholder='Postal Code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='dark'
            className='default-font px-5 py-3 my-4'
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingScreen;
