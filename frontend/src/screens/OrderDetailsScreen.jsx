import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rupee from './../components/Rupee';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { listOrderDetails, payOrder } from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from './../constants/orderConstants';

const OrderDetailsScreen = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&buyer-country=IN`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(listOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(order._id, paymentResult));
  };

  return (
    <Container className='padding-top-10'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col sm={12} md={8}>
            <h1 className='pb-3'>ORDER #{order._id}</h1>
            <ListGroup variant='flush' className='pt-3 default-font px-3'>
              <ListGroup.Item className='py-4'>
                <Row>
                  <h1 className='pb-3'>Shipping</h1>
                </Row>
                <Row className='pb-3'>
                  <strong className='pr-3'>Name: </strong>
                  {`${order.user.name}`}
                </Row>
                <Row className='pb-3'>
                  <strong className='pr-3'>Email: </strong>
                  <a
                    className='text-dark'
                    href={`mailto:${order.user.email}`}
                  >{`${order.user.email}`}</a>
                </Row>
                <Row>
                  <strong className='pr-3'>Address: </strong>
                  {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postalCode}`}
                </Row>
                <Row>
                  <Message variant='success'>
                    Order placed at {order.createdAt.substring(0, 10)}
                  </Message>
                </Row>
                <Row className='mt-minus-4'>
                  {order.isDispatched ? (
                    <Message variant='success'>
                      Dispatched at {order.dispatchedAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message>Not Dispatched</Message>
                  )}
                </Row>
                <Row className='mt-minus-4'>
                  {order.isShipped ? (
                    <Message variant='success'>
                      Shipped at {order.shippedAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message>Not Shipped</Message>
                  )}
                </Row>
                <Row className='mt-minus-4'>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered at {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message>Not Delivered</Message>
                  )}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <h1 className='py-3'>Payment Method</h1>
                </Row>
                <Row>
                  <strong>Method: </strong>
                  <span className='text-uppercase pl-3'>
                    {order.paymentMethod}
                  </span>
                </Row>
                <Row>
                  {order.isPaid ? (
                    <Message variant='success'>
                      Paid at {order.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message>Not Paid</Message>
                  )}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <h1 className='py-3'>Order Items</h1>
                </Row>
                {order.orderItems.map((item) => (
                  <Row key={item._id} className='py-2'>
                    <Col xs={2} sm={1}>
                      <Image src={item.image} fluid />
                    </Col>
                    <Col>
                      <Link to={`/books/${item._id}`} className='text-dark'>
                        {item.title}
                      </Link>
                    </Col>
                    <Col sm={4} className='text-right'>
                      {item.qty} x <Rupee />
                      {item.price.toFixed(2)} = <Rupee />
                      {(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={12} md={4}>
            <ListGroup className='default-font position-sticky top-10'>
              <ListGroup.Item className='py-4 px-5'>
                <h1>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item className='px-5 py-3 d-flex'>
                <strong>Items Price : </strong>
                <span className='ml-auto'>
                  <Rupee />
                  {order.itemsPrice.toFixed(2)}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className='px-5 py-3 d-flex'>
                <strong>Shipping: </strong>
                <span className='ml-auto text-success'>
                  {order.itemsPrice > 499 ? (
                    <>
                      <Rupee /> 0
                    </>
                  ) : (
                    <>
                      + <Rupee />
                      49
                    </>
                  )}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className='px-5 py-4'>
                <strong className='d-flex bigger-font'>
                  Total Amount
                  <span className='ml-auto'>
                    <Rupee />
                    {order.itemsPrice > 499
                      ? order.itemsPrice.toFixed(2)
                      : (order.itemsPrice + 49).toFixed(2)}
                  </span>
                </strong>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message>{error}</Message>
                </ListGroup.Item>
              )}
              {loading ? (
                <Loader />
              ) : (
                !order.isPaid &&
                (!sdkReady ? (
                  <Loader />
                ) : (
                  <ListGroup.Item className='m-0 p-0 border-0'>
                    <PayPalButton
                      amount={
                        order.itemsPrice > 499
                          ? order.itemsPrice.toFixed(2)
                          : (order.itemsPrice + 49).toFixed(2)
                      }
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderDetailsScreen;
