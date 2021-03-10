import React, { useEffect } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rupee from '../components/Rupee';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }
    dispatch(listMyOrders());
  }, [dispatch, history, userInfo]);

  const detailsHandler = (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <Container className='padding-top-10'>
      {loading == true ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row className='px-5 pb-5'>
            <h1 className='heading'>My Orders</h1>
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
                  <th>Order Id</th>
                  <th className='text-center'>Date</th>
                  <th className='text-center'>Amount</th>
                  <th className='text-center'>Paid</th>
                  <th className='text-center'>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className='text-info'>{order._id}</td>
                    <td className='text-center text-info'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='text-right text-success'>
                      <Rupee />
                      {order.totalPrice.toFixed(2)}
                    </td>
                    <td className='text-center bigger-font'>
                      {order.isPaid ? (
                        <i className='fas fa-check-circle text-success'></i>
                      ) : (
                        <i className='fas fa-times-circle text-danger'></i>
                      )}
                    </td>
                    <td className='text-center bigger-font'>
                      {order.isDelivered ? (
                        <i className='fas fa-check-circle text-success'></i>
                      ) : (
                        <i className='fas fa-times-circle text-danger'></i>
                      )}
                    </td>
                    <td className='text-center'>
                      <Button
                        variant='info'
                        className='default-font btn-block'
                        onClick={() => detailsHandler(order._id)}
                      >
                        Details
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

export default ProfileScreen;
