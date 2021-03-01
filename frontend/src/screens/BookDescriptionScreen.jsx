import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap';
import { getBookDescription } from '../actions/bookActions';
import Rating from './../components/Rating';
import '../styles/BookDescriptionScreen.scss';
import Rupee from './../components/Rupee';
import BookSummary from './../components/BookSummary';
import BookDetails from './../components/BookDetails';
import Loader from '../components/Loader';
import Message from '../components/Message';

const BookDescriptionScreen = ({ match }) => {
  const tabs = ['Summary', 'Details', 'Reviews'];
  const [toggleTab, setToggleTab] = useState(tabs[0]);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const bookDescription = useSelector((state) => state.bookDescription);
  const { book, loading, error } = bookDescription;

  useEffect(() => {
    dispatch(getBookDescription(match.params.id));
  }, [dispatch]);

  return (
    <Container className='book-description__container'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col
            md={6}
            className='d-flex justify-content-center book-description__image-container'
          >
            <Image
              src={book.image}
              alt={book.title}
              fluid
              className='book-description__image'
            />
          </Col>
          <Col md={6} className='book-description__content'>
            <Row>
              <h1 className='book-description__title'>{book.title}</h1>
            </Row>

            <Row className='book-description__rating'>
              <Rating
                value={book.rating}
                color={'#000'}
                text={String(book.rating)}
              />
            </Row>

            <Row>
              <ListGroup className='book-description__listgroup'>
                <ListGroup.Item>
                  <Row>
                    <Col xs={6}>Price</Col>

                    <Col xs={6}>
                      <Rupee />
                      {book.mrp}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col xs={6}>Status</Col>

                    <Col xs={6}>
                      {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col xs={6}>Qty</Col>

                    <Col xs={6}>
                      <Form.Control
                        as='select'
                        className='default-font'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[
                          ...Array(
                            Math.min(
                              10,
                              book.countInStock ? book.countInStock : 0
                            )
                          ).keys(),
                        ].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className='book-description__listgroup__button-container'>
                  <Button
                    variant='dark'
                    type='button'
                    className='btn-block default-font p-3'
                    disabled={book.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Row>

            <Row className='book-description__tabs-panel'>
              {tabs.map((tab) => (
                <div
                  className={
                    toggleTab === tab
                      ? 'book-description__tabs book-description__tabs-active'
                      : 'book-description__tabs'
                  }
                  onClick={() => setToggleTab(tab)}
                  key={tab}
                >
                  {tab}
                </div>
              ))}
            </Row>
            <Row className='book-description__tabs-content'>
              {toggleTab === 'Summary' && (
                <BookSummary summary={book.description} />
              )}
              {toggleTab === 'Details' && (
                <BookDetails
                  category={book.category}
                  genre={book.genre}
                  language={book.language}
                  weight={book.weight}
                  pages={book.numOfPages}
                  authors={book.author}
                  dimensions={book.dimensions}
                />
              )}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookDescriptionScreen;
