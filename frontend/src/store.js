import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  bookDescriptionReducer,
  bookTrendingListReducer,
} from './reducers/bookReducers';

const reducer = combineReducers({
  bookTrendingList: bookTrendingListReducer,
  bookDescription: bookDescriptionReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
