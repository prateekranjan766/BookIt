import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rupee from './../components/Rupee';
import Loader from './../components/Loader';
import Message from './../components/Message';
import {
  listOrderDetails,
  payOrder,
  dispatchOrder,
  shipOrder,
  deliverOrder,
} from '../actions/orderActions';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  ORDER_PAY_RESET,
  ORDER_DISPATCH_RESET,
  ORDER_SHIP_RESET,
  ORDER_DELIVER_RESET,
} from './../constants/orderConstants';

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

  const orderDispatch = useSelector((state) => state.orderDispatch);
  const {
    loading: loadingDispatch,
    success: successDispatch,
    error: errorDispatch,
  } = orderDispatch;

  const orderShip = useSelector((state) => state.orderShip);
  const {
    loading: loadingShip,
    success: successShip,
    error: errorShip,
  } = orderShip;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

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

    if (
      !order ||
      successPay ||
      order._id !== orderId ||
      successDispatch ||
      successShip ||
      successDeliver
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DISPATCH_RESET });
      dispatch({ type: ORDER_SHIP_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(listOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    order,
    successPay,
    history,
    userInfo,
    successDispatch,
    successShip,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult));
  };

  const dispatchHandler = () => {
    dispatch(dispatchOrder(order._id));
  };

  const shipHandler = () => {
    dispatch(shipOrder(order._id));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
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
                ) : loadingPay ? (
                  <Loader />
                ) : (
                  !userInfo.isAdmin && (
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
                  )
                ))
              )}

              {userInfo.isAdmin && (
                <ListGroup.Item className='m-0 px-0 pb-0 pt-1 border-0'>
                  <Button
                    variant={order.isDispatched ? 'success' : 'dark'}
                    className='btn-block default-font py-3 text-uppercase ls-2'
                    disabled={order.isDispatched === true}
                    onClick={dispatchHandler}
                  >
                    {/*classname ls-2 means letter-spacing = .2rem*/}
                    {order.isDispatched ? 'Dispatched' : 'Mark as dispatched'}
                  </Button>
                </ListGroup.Item>
              )}

              {userInfo.isAdmin && (
                <ListGroup.Item className='m-0 py-1 px-0 border-0'>
                  <Button
                    variant={order.isShipped ? 'success' : 'dark'}
                    className='btn-block default-font py-3 text-uppercase ls-2'
                    disabled={order.isShipped === true}
                    onClick={shipHandler}
                  >
                    {/*classname ls-2 means letter-spacing = .2rem*/}
                    {order.isShipped ? 'Shipped' : 'Mark as shipped'}
                  </Button>
                </ListGroup.Item>
              )}

              {userInfo.isAdmin && (
                <ListGroup.Item className='m-0 p-0 border-0'>
                  <Button
                    variant={order.isDelivered ? 'success' : 'dark'}
                    className='btn-block default-font py-3 text-uppercase ls-2'
                    disabled={order.isDelivered === true}
                    onClick={deliverHandler}
                  >
                    {/*classname ls-2 means letter-spacing = .2rem*/}
                    {order.isDelivered ? 'Delivered' : 'Mark as Delivered'}
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OrderDetailsScreen;
