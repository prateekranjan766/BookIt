import {
  BOOK_TRENDING_LIST_REQUEST,
  BOOK_TRENDING_LIST_SUCCESS,
  BOOK_TRENDING_LIST_FAIL,
} from '../constants/bookConstants';
import axios from 'axios';

export const listTrendingBooks = (category, count) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_TRENDING_LIST_REQUEST });

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
