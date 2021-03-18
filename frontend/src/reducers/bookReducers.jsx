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

export const bookListReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, ...state };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true, ...state };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true, ...state };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true, ...state };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const bookCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REVIEW_REQUEST:
      return { loading: true, ...state };
    case BOOK_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case BOOK_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const bookScreenListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_SCREEN_LIST_REQUEST:
      return { loading: true, ...state };
    case BOOK_SCREEN_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_SCREEN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_SCREEN_LIST_RESET:
      return {};
    default:
      return state;
  }
};
