import React, { useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rupee from './../components/Rupee';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { createOrder } from '../actions/orderActions';
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;

  const totalDiscount = cartItems
    .reduce((acc, item) => acc + (item.qty * item.discount * item.mrp) / 100, 0)
    .toFixed(2);

  const totalMrp = cartItems
    .reduce((acc, item) => acc + item.qty * item.mrp, 0)
    .toFixed(2);

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      history.push(`/orders/${order._id}`);
    }
    if (!paymentMethod) {
      history.push('/paymentMethod');
    }
  }, [shippingAddress, paymentMethod, history, success, order, dispatch]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        shippingAddress,
        paymentMethod,
        orderItems: cart.cartItems.map((item) => ({
          title: item.title,
          image: item.image,
          qty: item.qty,
          price: ((100 - item.discount) * item.mrp) / 100,
          book: item._id,
        })),
        itemsPrice: Number(Number(totalMrp) - Number(totalDiscount)),
        shippingPrice: Number(totalMrp) - Number(totalDiscount) > 499 ? 0 : 49,
        totalPrice:
          Number(Number(totalMrp) - Number(totalDiscount)) +
          (Number(totalMrp) - Number(totalDiscount) > 499 ? 0 : 49),
      })
    );
    setTimeout(() => {
      dispatch({ type: CART_EMPTY });
    }, 1000);
  };

  return (
    <Container className='padding-top-10'>
      {!shippingAddress ? (
        <Loader />
      ) : (
        <Row>
          <Col sm={12} md={8}>
            <CheckoutSteps step1 step2 step3 step4 />
            <ListGroup variant='flush' className='pt-3 default-font px-3'>
              <ListGroup.Item className='py-4'>
                <Row>
                  <h1 className='pb-3'>Shipping</h1>
                </Row>
                <Row className='pb-3'>
                  <strong className='pr-3'>Address: </strong>
                  {`${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postalCode}`}
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <h1 className='py-3'>Payment Method</h1>
                </Row>
                <Row className='pb-3'>
                  <strong>Method: </strong>
                  <span className='text-uppercase pl-3'>{paymentMethod}</span>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <h1 className='py-3'>Order Items</h1>
                </Row>
                {cartItems.map((item) => (
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
                      {(((100 - item.discount) * item.mrp) / 100).toFixed(
                        2
                      )} = <Rupee />
                      {(
                        item.qty *
                        (((100 - item.discount) * item.mrp) / 100)
                      ).toFixed(2)}
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
                  {totalMrp}{' '}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className='px-5 py-3 d-flex'>
                <strong>Discount : </strong>
                <span className='ml-auto text-success'>
                  - <Rupee />
                  {totalDiscount}{' '}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className='px-5 py-3 d-flex'>
                <strong>Shipping: </strong>
                <span className='ml-auto text-success'>
                  {totalMrp - totalDiscount > 499 ? (
                    'FREE'
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
                    {totalMrp - totalDiscount > 499
                      ? (totalMrp - totalDiscount).toFixed(2)
                      : (totalMrp - totalDiscount + 49).toFixed(2)}
                  </span>
                </strong>
              </ListGroup.Item>

              {totalDiscount > 0 && (
                <ListGroup.Item className='px-5 py-3 default-font text-success'>
                  You will save <Rupee />
                  {totalDiscount} on this order
                </ListGroup.Item>
              )}

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
                    className='btn-block default-font py-4 text-capitalize'
                    variant='dark'
                    onClick={(e) => placeOrderHandler(e)}
                  >
                    Place Order
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

export default PlaceOrderScreen;
