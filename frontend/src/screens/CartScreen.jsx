import React, { useState, useEffect } from 'react';
import {
  Container,
  ListGroup,
  Row,
  Col,
  Image,
  Form,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/CartScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import Rupee from '../components/Rupee';
import { addToCart, removeFromCart } from './../actions/cartActions';
import Message from '../components/Message';

const CartScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const totalDiscount = cartItems
    .reduce((acc, item) => acc + (item.qty * item.discount * item.mrp) / 100, 0)
    .toFixed(2);

  const totalMrp = cartItems
    .reduce((acc, item) => acc + item.qty * item.mrp, 0)
    .toFixed(2);

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Container className='cart__container default-font'>
      {cartItems.length === 0 ? (
        <Message variant={'info'}>
          Your cart is empty.
          <Link to='/' className='text-dark'>
            <strong>Go Back</strong>
          </Link>
        </Message>
      ) : (
        <Row>
          <Col lg={8}>
            <ListGroup>
              <ListGroup.Item className='cart__heading py-4 px-5'>
                My Cart ({cartItems.length})
              </ListGroup.Item>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className='py-3 cart__items'>
                    <Col xs={4} sm={2}>
                      <Image src={item.image} alt={item.title} fluid rounded />
                    </Col>
                    <Col xs={8} sm={7}>
                      <Row>
                        <Link to={`/books/${item._id}`} className='text-dark'>
                          {item.title}
                        </Link>
                      </Row>

                      <Row>
                        <strong className='text-muted'>Language :</strong>{' '}
                        <p className='px-3 text-muted'>
                          {item.language}
                          {' ,'}
                        </p>
                        <strong className='text-muted'>Author :</strong>{' '}
                        <p className='px-3 text-muted'>{item.author[0]}</p>
                      </Row>

                      <Row>
                        <strong className='text-muted'>Genre :</strong>{' '}
                        <p className='px-3 text-muted text-capitalize'>
                          {item.genre}
                        </p>
                      </Row>

                      <Row className='cart__price'>
                        <strong>Price :</strong>{' '}
                        <p className='px-3'>
                          <Rupee />
                          {(((100 - item.discount) * item.mrp) / 100).toFixed(
                            2
                          )}
                        </p>
                        <p className='px-3 text-muted smaller-font py-1'>
                          <del>
                            <Rupee />
                            {item.mrp}
                          </del>
                        </p>
                        <p className='text-success bold-font'>
                          {item.discount}% Off
                        </p>
                      </Row>
                    </Col>

                    <Col sm={3} className='d-flex flex-column'>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form>
                            <Form.Control
                              as='select'
                              className='smaller-font pb-2 ml-auto cart__quantity'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(addToCart(item._id, e.target.value))
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Form>
                        </Col>
                      </Row>

                      <Row className='mt-auto px-4'>
                        <Button
                          type='button'
                          className='btn-block btn-dark py-3'
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          <i className='fas fa-trash default-font'></i>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={4}>
            <ListGroup className='position-sticky top-10'>
              <ListGroup.Item>
                <p className='text-uppercase px-3 pt-2 text-muted cart__heading'>
                  Price Details
                </p>
              </ListGroup.Item>
              <ListGroup.Item className='dashed-border-bottom'>
                <p className='px-3 pt-4 d-flex'>
                  Price ({cartItems.length} items)
                  <span className='ml-auto'>
                    <Rupee />
                    {totalMrp}
                  </span>
                </p>

                <p className='px-3 pt-4 d-flex'>
                  Discount
                  <span className='ml-auto text-success'>
                    - <Rupee />
                    {totalDiscount}
                  </span>
                </p>

                <p className='px-3 pt-4 d-flex'>
                  Delivery Charges
                  <span className='ml-auto text-success'>
                    {totalMrp - totalDiscount > 499 ? (
                      'FREE'
                    ) : (
                      <>
                        <Rupee />
                        49
                      </>
                    )}
                  </span>
                </p>
              </ListGroup.Item>

              <ListGroup.Item className='dashed-border-bottom'>
                <strong className='px-3 py-4 d-flex bigger-font'>
                  Total Amount
                  <span className='ml-auto'>
                    <Rupee />
                    {totalMrp - totalDiscount > 499
                      ? (totalMrp - totalDiscount).toFixed(2)
                      : (totalMrp - totalDiscount + 49).toFixed(2)}
                  </span>
                </strong>
              </ListGroup.Item>

              <ListGroup.Item>
                <p className='px-3 pt-3 d-flex default-font text-success'>
                  You will save <Rupee />
                  {totalDiscount} on this order
                </p>
              </ListGroup.Item>

              <ListGroup.Item className='m-0 p-0 border-0'>
                <Button
                  type='button'
                  className='btn-block default-font py-4 text-capitalize'
                  variant='dark'
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartScreen;
