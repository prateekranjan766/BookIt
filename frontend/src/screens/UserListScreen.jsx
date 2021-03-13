import React, { useEffect } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rupee from '../components/Rupee';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.name || !userInfo.isAdmin) {
      history.push('/login');
    }
    dispatch(listUsers());
  }, [dispatch, history, userInfo]);

  const detailsHandler = () => {
    // history.push(`/user/${id}`);
    console.log('details handler called');
  };

  return (
    <Container className='padding-top-10'>
      {loading == true ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : users.length === 0 ? (
        <Message variant='info'>No Users Found!!</Message>
      ) : (
        <>
          <Row className='px-5 pb-5'>
            <h1 className='heading'>All Users</h1>
          </Row>
          <Row className='px-5'>
            <Table
              hover
              striped
              bordered
              responsive
              variant='dark'
              className='default-font'
            >
              <thead>
                <tr className='text-warning'>
                  <th>User Id</th>
                  <th>User Name</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Admin</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className='text-info'>{user._id}</td>
                    <td className='text-info'>{user.name}</td>
                    <td className='text-center text-info'>{user.email}</td>
                    <td className='text-center bigger-font'>
                      {user.isAdmin ? (
                        <i className='fas fa-check-circle text-success'></i>
                      ) : (
                        <i className='fas fa-times-circle text-danger'></i>
                      )}
                    </td>
                    <td className='text-center py-0 px-1 m-0'>
                      <Button
                        variant='light'
                        className='default-font  py-3 btn-block'
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </td>
                    <td className='text-center p-0 m-0'>
                      <Button
                        variant='danger'
                        className='default-font  py-3 btn-block'
                      >
                        <i class='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserListScreen;
