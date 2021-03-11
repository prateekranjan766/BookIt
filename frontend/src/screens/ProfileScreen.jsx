import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from './../components/Message';
import {
  getProfileDetails,
  updateProfileDetails,
} from '../actions/userActions';
import '../styles/LoginScreen.scss';
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userProfileDetails = useSelector((state) => state.userProfileDetails);
  const { loading, error, user } = userProfileDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate);
  const { success } = userProfileUpdate;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [editProfile, setEditProfile] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }

    if (!user || success) {
      dispatch(getProfileDetails());
      dispatch({ type: USER_PROFILE_UPDATE_RESET });
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.userAddress) {
        setAddress(user.userAddress.address);
        setCity(user.userAddress.city);
        setState(user.userAddress.state);
        setPostalCode(user.userAddress.postalCode);
      }
    }
  }, [dispatch, user, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfileDetails({
        name,
        email,
        userAddress: { address, city, state, postalCode },
      })
    );
    setEditProfile(false);
  };

  return (
    <Container className='login__screen__container'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <h1 className='py-4 login__screen__heading text-center'>Profile</h1>
          <Row className='pb-5'>
            <Col>
              <Button
                variant={editProfile ? 'danger' : 'dark'}
                className='default-font px-4 py-2'
                onClick={() => setEditProfile(!editProfile)}
              >
                {!editProfile ? (
                  <>
                    <i className='fas fa-pencil-alt'></i> Edit
                  </>
                ) : (
                  <>
                    <i className='fas fa-times'></i> Cancle
                  </>
                )}
              </Button>
            </Col>
          </Row>
          {success && <Message variant='success '>Profile Updated</Message>}
          <Form className='default-font' onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={editProfile === false}
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
                disabled={editProfile === false}
                required
              ></Form.Control>
            </Form.Group>

            <p className='text-muted pt-3'>
              *Add your address for faster checkouts
            </p>

            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                className='default-font login__screen__input'
                type='text'
                placeholder='Address'
                value={address}
                disabled={editProfile === false}
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
                disabled={editProfile === false}
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
                disabled={editProfile === false}
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
                disabled={editProfile === false}
              ></Form.Control>
            </Form.Group>

            {editProfile && (
              <Button
                type='submit'
                variant='dark'
                className='default-font px-4 py-2 mt-5'
              >
                Update
              </Button>
            )}

            <Row className='default-font py-3'>
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
