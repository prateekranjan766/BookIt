import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from './../components/Message';
import { getUserProfileInfo, updateUserProfile } from '../actions/userActions';
import '../styles/LoginScreen.scss';
import { USER_EDIT_RESET, USER_INFO_RESET } from '../constants/userConstants';

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const userProfileInfo = useSelector((state) => state.userProfileInfo);
  const { loading, error, user } = userProfileInfo;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userEdit = useSelector((state) => state.userEdit);
  const { success: successEdit, loading: loadingEdit } = userEdit;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }

    if (!user || successEdit || user._id !== userId) {
      dispatch(getUserProfileInfo(userId));
      dispatch({ type: USER_EDIT_RESET });
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, successEdit, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile(userId, {
        name,
        email,
        isAdmin,
      })
    );
    dispatch({ type: USER_INFO_RESET });
    history.push('/admin/userList');
  };

  return (
    <Container className='login__screen__container'>
      {loading || loadingEdit ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <Link
            to='/admin/userList'
            className='btn btn-dark default-font px-4 py-2'
          >
            Go Back
          </Link>
          <h1 className='py-4 login__screen__heading text-center'>Profile</h1>

          {successEdit && <Message variant='success'>Profile Updated</Message>}
          <Form className='default-font' onSubmit={(e) => submitHandler(e)}>
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

            <Form.Group controlId='admin'>
              <Form.Check
                className='default-font'
                type='checkbox'
                label='is Admin'
                checked={isAdmin}
                inline
                onChange={(e) => setIsAdmin(!isAdmin)}
              ></Form.Check>
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
      )}
    </Container>
  );
};

export default UserEditScreen;
