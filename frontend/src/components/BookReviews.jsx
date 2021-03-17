import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Row, Col, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import Rating from './Rating';
import { createBookReview } from '../actions/bookActions';

const BookReviews = ({ id, reviews, error }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBookReview(id, { rating, comment }));
    setRating(0);
    setComment('');
  };

  return (
    <>
      {reviews &&
        (reviews.length === 0 ? (
          <Message variant='info'>No Reviews</Message>
        ) : (
          <ListGroup variant='flush' className='default-font reviews'>
            {reviews.map((review) => (
              <ListGroup.Item key={review._id} className='d-block'>
                <p>{review.name}</p>
                <p className='text-muted' style={{ marginTop: '-1.3rem' }}>
                  {review.createdAt.substring(0, 10)}
                </p>
                <Rating value={review.rating}></Rating>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
      {userInfo && userInfo.name && (
        <Row>
          <Row className='pb-3'>
            <Col>
              <h1>Write a customer review</h1>
            </Col>
          </Row>
          <Container>
            {error && <Message>{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='rating' className='d-flex'>
                <Form.Label className='default-font mr-3 align-self-center'>
                  Rating
                </Form.Label>
                <Form.Control
                  as='select'
                  value={rating}
                  className='default-font'
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>Select...</option>
                  <option value='1'>1 - Poor</option>
                  <option value='2'>2 - Fair</option>
                  <option value='3'>3 - Good</option>
                  <option value='4'>4 - Very Good</option>
                  <option value='5'>5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='comment'>
                <Form.Label className='default-font'>Comment</Form.Label>
                <Form.Control
                  type='text'
                  value={comment}
                  className='default-font'
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type='submit' variant='dark' className='default-font'>
                Submit
              </Button>
            </Form>
          </Container>
        </Row>
      )}
    </>
  );
};

export default BookReviews;
