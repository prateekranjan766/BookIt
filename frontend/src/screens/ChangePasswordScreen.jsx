import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from './../components/Message';
import { updateProfileDetails } from '../actions/userActions';
import '../styles/LoginScreen.scss';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';

const ChangePasswordScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }
    if (success) {
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
      history.push('/profile');
    }
  }, [dispatch, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(updateProfileDetails({ password }));
      console.log(password);
    } else {
      setMessage("Passwords doesn't match");
    }
  };

  return (
    <Container className='login__screen__container'>
      <FormContainer>
        <Link to='/profile' className='btn btn-outline-dark default-font my-3'>
          Go Back
        </Link>
        <h1 className='py-4 login__screen__heading text-center'>
          Update Password
        </h1>
        {success && <Message variant='success'>Profile Updated</Message>}
        {message && <Message>{message}</Message>}
        <Form className='default-font' onSubmit={(e) => submitHandler(e)}>
          <Form.Group controlId='password'>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='password'
              placeholder='Enter new password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm new Password</Form.Label>
            <Form.Control
              className='default-font  login__screen__input'
              type='password'
              placeholder='Confirm new password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='dark'
            className='default-font px-4 py-2 mt-5'
          >
            Update
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ChangePasswordScreen;
