import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './../actions/userActions';
import Loader from '../components/Loader';
import Message from './../components/Message';
import '../styles/LoginScreen.scss';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.name) {
      history.push(redirect);
    }
  }, [userInfo]);

  return (
    <Container className='login__screen__container'>
      <FormContainer>
        <h1 className='py-4 login__screen__heading'>Sign In</h1>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Form className='default-font'>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              className='default-font login__screen__input'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Button
            type='submit'
            variant='dark'
            className='default-font px-5 py-3 my-4'
            onClick={(e) => submitHandler(e)}
          >
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
