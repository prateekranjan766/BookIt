import {
  BOOK_TRENDING_LIST_REQUEST,
  BOOK_TRENDING_LIST_SUCCESS,
  BOOK_TRENDING_LIST_FAIL,
} from '../constants/bookConstants';

export const bookTrendingListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_TRENDING_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_TRENDING_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_TRENDING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
