import {
  BOOK_TRENDING_LIST_REQUEST,
  BOOK_TRENDING_LIST_SUCCESS,
  BOOK_TRENDING_LIST_FAIL,
  BOOK_DESCRIPTION_REQUEST,
  BOOK_DESCRIPTION_SUCCESS,
  BOOK_DESCRIPTION_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_LIST_RESET,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_RESET,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
  BOOK_CREATE_REVIEW_REQUEST,
  BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_CREATE_REVIEW_RESET,
  BOOK_SCREEN_LIST_REQUEST,
  BOOK_SCREEN_LIST_SUCCESS,
  BOOK_SCREEN_LIST_FAIL,
  BOOK_SCREEN_LIST_RESET,
} from '../constants/bookConstants';
import axios from 'axios';

export const listTrendingBooks = (category, count) => async (dispatch) => {
  dispatch({ type: BOOK_TRENDING_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/books/${category}/${Number(count)}`);

    dispatch({ type: BOOK_TRENDING_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_TRENDING_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getBookDescription = (id) => async (dispatch) => {
  dispatch({ type: BOOK_DESCRIPTION_REQUEST });
  try {
    const { data } = await axios.get(`/api/books/${id}`);

    dispatch({ type: BOOK_DESCRIPTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_DESCRIPTION_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const listBooks = () => async (dispatch, getState) => {
  dispatch({ type: BOOK_LIST_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/books/allBooks`, config);

    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createBook = () => async (dispatch, getState) => {
  dispatch({ type: BOOK_CREATE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/books`, {}, config);

    dispatch({ type: BOOK_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  dispatch({ type: BOOK_DELETE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/books/${id}`, config);

    dispatch({ type: BOOK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateBook = (id, book) => async (dispatch, getState) => {
  dispatch({ type: BOOK_UPDATE_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`/api/books/${id}`, book, config);

    dispatch({ type: BOOK_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_UPDATE_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createBookReview = (id, review) => async (dispatch, getState) => {
  dispatch({ type: BOOK_CREATE_REVIEW_REQUEST });
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/books/${id}/reviews`, review, config);

    dispatch({ type: BOOK_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_REVIEW_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getBooksForBookScreen = (
  sortBy,
  keyword = '',
  category = '',
  rating = '',
  price = '',
  pages = ''
) => async (dispatch, getState) => {
  dispatch({ type: BOOK_SCREEN_LIST_REQUEST });
  try {
    const { data } = await axios.get(
      `/api/books/bookScreen/${sortBy}?keyword=${keyword}&category=${category}&rating=${rating}&price=${price}&pages=${pages}`
    );

    dispatch({ type: BOOK_SCREEN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOK_SCREEN_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
