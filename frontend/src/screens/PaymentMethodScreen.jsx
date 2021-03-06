import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from './../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import '../styles/LoginScreen.scss';

const ShippingScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }
    if (!shippingAddress) {
      history.push('/shipping');
    }
  }, [shippingAddress, userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeOrder');
  };

  return (
    <Container className='login__screen__container'>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1 className='py-4 login__screen__heading'>Payment Method</h1>
        <Form className='default-font' onSubmit={submitHandler}>
          <Form.Group>
            <Col>
              <Form.Check
                inline
                type='radio'
                label='PayPal'
                id='PayPal'
                value='paypal'
                name='paymentMethod'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button
            type='submit'
            variant='dark'
            className='default-font px-5 py-3 my-4'
            disabled={paymentMethod === ''}
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingScreen;
