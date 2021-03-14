import React, { useEffect } from 'react';
import { Container, Row, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks, createBook, deleteBook } from '../actions/bookActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rupee from '../components/Rupee';
import { BOOK_CREATE_RESET } from '../constants/bookConstants';
// import { USER_EDIT_RESET, USER_LIST_RESET } from '../constants/userConstants';

const BookListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BOOK_CREATE_RESET });
    if (successCreate) {
      history.push(`/admin/book/${createdBook._id}/edit`);
    }
    if (!userInfo || !userInfo.name || !userInfo.isAdmin) {
      history.push('/login');
    } else {
      dispatch(listBooks());
      //   dispatch({ type: USER_EDIT_RESET });
    }
  }, [dispatch, history, userInfo, books, successCreate, successDelete]);

  const editHandler = (id) => {
    history.push(`/admin/book/${id}/edit`);
  };
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteBook(id));
    }
  };

  const createBookHandler = () => {
    dispatch(createBook());
  };

  return (
    <Container className='padding-top-10'>
      {loading === true || loadingCreate === true || loadingDelete === true ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : !books ? (
        <Message variant='info'>No Books Found!!</Message>
      ) : (
        <>
          {errorCreate && <Message>{errorCreate}</Message>}
          {errorDelete && <Message>{errorDelete}</Message>}
          <Row className='px-5 pb-5 d-flex'>
            <h1 className='heading-left'>All Books</h1>
            <Button
              variant='dark'
              className='default-font ml-auto px-5'
              onClick={createBookHandler}
            >
              Create Book
            </Button>
          </Row>
          <Row className='px-5'>
            <Table hover striped bordered responsive className='default-font'>
              <thead>
                <tr>
                  <th>Book Id</th>
                  <th>Title</th>
                  <th className='text-center'>MRP</th>
                  <th className='text-center'>Discount</th>
                  <th className='text-center'>Price</th>
                  <th className='text-center'>Category</th>
                  <th className='text-center'>Genre</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>{book._id}</td>
                    <td>
                      <Link to={`/books/${book._id}`} className='text-dark'>
                        {book.title}
                      </Link>
                    </td>
                    <td className='text-right'>
                      <Rupee />
                      {book.mrp}
                    </td>
                    <td className='text-right'>{book.discount}%</td>
                    <td className='text-right'>
                      <Rupee />
                      {(book.mrp - (book.discount * book.mrp) / 100).toFixed(2)}
                    </td>
                    <td className='text-center text-capitalize'>
                      {book.category}
                    </td>
                    <td className='text-center text-capitalize'>
                      {book.genre === '' ? 'N/A' : book.genre}
                    </td>
                    <td className='text-center py-0 px-1 m-0'>
                      <Button
                        variant='light'
                        className='default-font  py-3 btn-block'
                        onClick={() => editHandler(book._id)}
                      >
                        <i className='fas fa-edit'></i>
                      </Button>
                    </td>
                    <td className='text-center  py-0 px-1 m-0'>
                      <Button
                        variant='danger'
                        className='default-font  py-3 btn-block'
                        onClick={() => deleteHandler(book._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BookListScreen;
