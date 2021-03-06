import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/BookScreen.scss';
import Rupee from './../components/Rupee';
import Rating from './../components/Rating';
import { getBooksForBookScreen } from './../actions/bookActions';
import FilterSidebar from './../components/FilterSidebar';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const BookScreen = ({ match }) => {
  const keyword = match.params.keyword;

  //For Filter
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(10000);
  const [rating, setRating] = useState('');
  const [pages, setPages] = useState(10000);

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sortBy, setSortBy] = useState('highestRated');

  const dispatch = useDispatch();

  const bookScreenList = useSelector((state) => state.bookScreenList);
  const { books, loading, error } = bookScreenList;

  const handleFilter = () => {
    if (toggleSidebar === true) {
      setToggleSidebar(false);
    } else {
      setToggleSidebar(true);
    }
  };

  const closeSidebar = () => {
    if (toggleSidebar === true) {
      setToggleSidebar(false);
    }
  };

  useEffect(() => {
    dispatch(
      getBooksForBookScreen(sortBy, keyword, category, rating, price, pages)
    );
  }, [dispatch, sortBy, keyword, category, rating, price, pages]);

  return (
    <>
      {toggleSidebar && (
        <FilterSidebar
          category={category}
          rating={rating}
          price={price}
          pages={pages}
          setCategory={setCategory}
          setRating={setRating}
          setPrice={setPrice}
          setPages={setPages}
          close={closeSidebar}
        />
      )}
      <Container className='book-screen__container'>
        <Row className='my-5'>
          <h1 className='book-screen__heading'>Shop All</h1>
        </Row>

        <Row className='my-5 sorting__row'>
          <Col sm={3}>
            <Button
              type='button'
              variant='light'
              className='book-screen__filter--button'
              onClick={handleFilter}
            >
              <i className='fas fa-filter'></i> Filter
            </Button>
            <p className='book-screen__count-in-stock'>12 items</p>
          </Col>

          <Col sm={6} md={3} className='ml-auto sorting__col'>
            <p className='book-screen__count-in-stock text-uppercase'>
              sort by
            </p>
            <FormControl
              as='select'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='book-screen__sortby'
            >
              <option value='highestRated'>Highest Rated</option>
              <option value='price-low-high'>Price Low - High</option>
              <option value='price-high-low'>Price High - Low</option>
            </FormControl>
          </Col>
        </Row>

        <Row className='books__section'>
          {books && books.length === 0 && (
            <Message variant='info'>No Books found!!</Message>
          )}
          {loading === true ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            books.map((book) => (
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
                          {book.price.toFixed(2)}
                        </Card.Title>
                      </Col>
                    </Row>
                  </Card>
                </LinkContainer>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default BookScreen;
