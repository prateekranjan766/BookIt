import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl,
  Container,
  Button,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './../components/Rating';
import './../styles/HomeScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { listTrendingBooks } from '../actions/bookActions';
import Rupee from './../components/Rupee';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const bookTrendingList = useSelector((state) => state.bookTrendingList);
  const { loading, error, books } = bookTrendingList;
  const bookTypes = ['Novels', 'Comics', 'Educational', 'Biography'];
  const [toggleTab, setToggleTab] = useState(bookTypes[0]);
  const ref = useRef('null');

  useEffect(() => {
    dispatch(listTrendingBooks(toggleTab.toLowerCase(), 5));
  }, [dispatch, toggleTab]);

  return (
    <div>
      <div className='landing__section'>
        {/* <Header /> */}
        <Container>
          <Row className='landing__section__search-container'>
            <FormControl
              className='landing__section__search'
              placeholder='What are you looking for?'
            ></FormControl>
          </Row>
          <Row>
            <h1 className='landing__section__heading'>
              What books are you looking for?
            </h1>
          </Row>
          <Row>
            <h3 className='landing__section__text'>
              Discover the best deals on the largest platform for books.
            </h3>
          </Row>
          <Row>
            <Link
              to='/books'
              className='btn btn-outline-light landing__section__button'
            >
              View All Books
            </Link>
          </Row>
        </Container>
      </div>
      <Container className='trending__section'>
        <Row>
          <h2 className='trending__section__heading'>
            Shop Our Trending Books
          </h2>
        </Row>
        <Row>
          <h3 className='trending__section__text'>
            Explore the latest books essential for you.
          </h3>
        </Row>

        <Row className='trending__section__tabs-panel'>
          {bookTypes.map((bookType) => (
            <div
              className={
                toggleTab === bookType
                  ? 'trending__section__tabs trending__section__tabs-active'
                  : 'trending__section__tabs'
              }
              onClick={() => setToggleTab(bookType)}
              key={bookType}
            >
              {bookType}
            </div>
          ))}
        </Row>
        <Row>
          <div ref={ref} className='trending__section__horizontal-slider'>
            {books.map((book) => (
              <Col key={book._id} xs={6} md={4} xl={3}>
                <LinkContainer to={`/books/${book._id}`}>
                  <Card className='trending__section__card p-3'>
                    <Card.Img
                      className='trending__section__card--image'
                      src={book.image}
                    />
                    <Row>
                      <Col sm={12} md={8}>
                        <Card.Title
                          style={{ marginTop: '1rem' }}
                          className='default-font'
                        >
                          {book.title.substring(0, 40) +
                            (book.title.length > 40 ? '...' : '')}
                        </Card.Title>
                      </Col>
                      <Col sm={12} md={4}>
                        <Card.Title className='py-3 trending__section__card--rating'>
                          <Rating value={book.rating}></Rating>
                        </Card.Title>
                        <Card.Title className='price'>
                          <Rupee />
                          {book.mrp.toFixed(2)}
                        </Card.Title>
                      </Col>
                    </Row>
                  </Card>
                </LinkContainer>
              </Col>
            ))}
          </div>
          <Button
            className='trending__section__button trending__section__button--right'
            onClick={() => (ref.current.scrollLeft += 250)}
          >
            <i
              style={{ color: '#333', fontSize: '1.8rem' }}
              className='fas fa-chevron-right'
            ></i>
          </Button>
          <Button
            className='trending__section__button trending__section__button--left'
            onClick={() => (ref.current.scrollLeft -= 250)}
          >
            <i
              style={{ color: '#333', fontSize: '1.8rem' }}
              className='fas fa-chevron-left'
            ></i>
          </Button>
        </Row>
        <Link
          to='/books'
          className='btn btn-outline-dark trending__section__button--main'
        >
          Shop All Trending
        </Link>
      </Container>

      <div className='banner__section'>
        <Container>
          <Row>
            <h1 className='banner__section__heading'>
              Books You Want. Deals You Love.
            </h1>
          </Row>
          <Row>
            <h3 className='banner__section__text'>
              Never miss a deal. We bring you the best prices for your favourite
              books. Explore a wide verity of books for all needs and all
              budgets.
            </h3>
          </Row>
          <Row>
            <Link
              to='/books'
              className='btn btn-outline-light banner__section__button'
            >
              Shop All
            </Link>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomeScreen;
