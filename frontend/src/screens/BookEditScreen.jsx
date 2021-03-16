import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from './../components/Message';
import { getBookDescription, updateBook } from '../actions/bookActions';
import { BOOK_UPDATE_RESET } from '../constants/bookConstants';
import '../styles/LoginScreen.scss';

const BookEditScreen = ({ history, match }) => {
  const bookId = match.params.id;
  const dispatch = useDispatch();

  const textAreaRef = useRef('');
  const [textAreaHeight, setTextAreaHeight] = useState(100);

  const bookDescription = useSelector((state) => state.bookDescription);
  const { loading, error, book } = bookDescription;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const { success: successUpdate, loading: loadingUpdate } = bookUpdate;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [genre, setGenre] = useState('');
  const [mrp, setMrp] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState('');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [numOfPages, setNumOfPages] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push('/login');
    }

    if (!book || book._id !== bookId || successUpdate) {
      dispatch(getBookDescription(bookId));
      dispatch({ type: BOOK_UPDATE_RESET });
    } else {
      setTextAreaHeight(textAreaRef.current.scrollHeight);
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setCategory(book.category);
      setLanguage(book.language);
      setCountInStock(book.countInStock);
      setGenre(book.genre);
      setMrp(book.mrp);
      setDiscount(book.discount);
      setImage(book.image);
      setLength(book.dimensions.length);
      setBreadth(book.dimensions.breadth);
      setHeight(book.dimensions.height);
      setNumOfPages(book.numOfPages);
      setWeight(book.weight);
    }
  }, [dispatch, book, bookId, userInfo, successUpdate]);

  const onDescriptionChange = (e) => {
    setTextAreaHeight(textAreaRef.current.scrollHeight);
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBook(bookId, {
        title,
        author,
        description,
        category,
        language,
        countInStock,
        genre,
        mrp,
        discount,
        image,
        length,
        breadth,
        height,
        numOfPages,
        weight,
      })
    );
    history.push('/admin/bookList');
  };

  return (
    <Container className='login__screen__container'>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <h1 className='py-4 login__screen__heading text-center'>Edit Book</h1>

          <Form className='default-font' onSubmit={(e) => submitHandler(e)}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                ref={textAreaRef}
                style={{ height: textAreaHeight }}
                className='default-font  login__screen__input'
                type='text'
                placeholder='Description'
                value={description}
                onChange={(e) => onDescriptionChange(e)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='language'>
              <Form.Label>Language</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Language'
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                placeholder='Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='genre'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Genre'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='mrp'>
              <Form.Label>MRP</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                placeholder='MRP'
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='discount'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                placeholder='Discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='text'
                placeholder='Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Label>Dimensions (in cms)</Form.Label>
            <Form.Group
              controlId='length'
              className='d-flex justify-content-between'
            >
              <Form.Control
                className='default-font  login__screen__input'
                style={{ width: '30%' }}
                type='number'
                placeholder='Length'
                value={length}
                inline
                onChange={(e) => setLength(e.target.value)}
                required
              ></Form.Control>

              <i className='fas fa-times align-self-center'></i>

              <Form.Control
                className='default-font  login__screen__input'
                style={{ width: '30%' }}
                type='number'
                placeholder='Breadth'
                value={breadth}
                inline
                onChange={(e) => setBreadth(e.target.value)}
                required
              ></Form.Control>

              <i className='fas fa-times align-self-center'></i>

              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                style={{ width: '30%' }}
                placeholder='Height'
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='numOfPages'>
              <Form.Label>Num Of Pages</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                placeholder='Num Of Pages'
                value={numOfPages}
                onChange={(e) => setNumOfPages(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='weight'>
              <Form.Label>Weight (in grams)</Form.Label>
              <Form.Control
                className='default-font  login__screen__input'
                type='number'
                placeholder='Weight'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='dark'
              className='default-font px-4 py-2 mt-5'
            >
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default BookEditScreen;
