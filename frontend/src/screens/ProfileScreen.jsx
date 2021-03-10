import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from './../components/Message';
import { getProfileDetails } from '../actions/userActions';
import '../styles/LoginScreen.scss';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { loading, error, user } = userProfileDetails;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    dispatch(getProfileDetails());

    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.userAddress) {
        setAddress(user.userAddress.address);
        setCity(user.userAddress.city);
        setState(user.userAddress.state);
        setPostalCode(user.userAddress.postalCode);
      }
    }
  }, []);

  return (
    <Container className='login__screen__container'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <h1 className='py-4 login__screen__heading text-center'>Profile</h1>
          {/* {message && <Message>{message}</Message>}
        {loading && <Loader />}
        {error && <Message>{error}</Message>} */}

          <Form className='default-font'>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <p className='text-muted pt-3'>
              *Add your address for faster checkouts
            </p>

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

            <Row className='default-font'>
              <Col>
                Change Password?
                <Link to='/profile/changePassword' className='text-dark px-2'>
                  <strong>Click here</strong>
                </Link>
              </Col>
            </Row>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default ProfileScreen;
