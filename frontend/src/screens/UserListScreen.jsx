import React, { useEffect } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { USER_EDIT_RESET, USER_LIST_RESET } from '../constants/userConstants';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, success: successDelete } = userDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.name || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (!users || successDelete) {
      dispatch(listUsers());
      dispatch({ type: USER_EDIT_RESET });
    }
  }, [dispatch, history, userInfo, successDelete, users]);

  const editHandler = (id) => {
    dispatch({ type: USER_LIST_RESET });
    history.push(`/admin/user/${id}/edit`);
  };
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container className='padding-top-10'>
      {loading === true || loadingDelete === true ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : !users ? (
        <Message variant='info'>No Users Found!!</Message>
      ) : (
        <>
          <Row className='px-5 pb-5'>
            <h1 className='heading'>All Users</h1>
          </Row>
          <Row className='px-5'>
            <Table hover striped bordered responsive className='default-font'>
              <thead>
                <tr>
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
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td className='text-center'>{user.email}</td>
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
                        onClick={() => editHandler(user._id)}
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </td>
                    <td className='text-center  py-0 px-1 m-0'>
                      <Button
                        variant='danger'
                        className='default-font  py-3 btn-block'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
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
