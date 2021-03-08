import React, { useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rupee from './../components/Rupee';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { listOrderDetails } from '../actions/orderActions';

const OrderDetailsScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  useEffect(() => {
    dispatch(listOrderDetails(orderId));
  }, [dispatch, orderId]);

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
                    <Message variant='success'>Paid</Message>
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
                <ListGroup.Item className='m-0 p-0 border-0'>
                  <Button
                    type='button'
                    className='btn-block display-1 text-italic bigger-font py-4 text-capitalize'
                    variant='dark'
                  >
                    <i className='fas fa-credit-card'></i> Pay Now
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
