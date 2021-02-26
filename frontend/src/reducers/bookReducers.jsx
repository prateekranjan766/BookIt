import {
  BOOK_TRENDING_LIST_REQUEST,
  BOOK_TRENDING_LIST_SUCCESS,
  BOOK_TRENDING_LIST_FAIL,
  BOOK_DESCRIPTION_REQUEST,
  BOOK_DESCRIPTION_SUCCESS,
  BOOK_DESCRIPTION_FAIL,
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

export const bookDescriptionReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DESCRIPTION_REQUEST:
      return { loading: true, ...state };
    case BOOK_DESCRIPTION_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOK_DESCRIPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
