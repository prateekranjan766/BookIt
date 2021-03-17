import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  bookDescriptionReducer,
  bookTrendingListReducer,
  bookListReducer,
  bookCreateReducer,
  bookDeleteReducer,
  bookUpdateReducer,
  bookCreateReviewReducer,
} from './reducers/bookReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userProfileDetailsReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userProfileInfoReducer,
  userEditReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDispatchReducer,
  orderShipReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListAllReducer,
} from './reducers/orderReducers';

const reducer = combineReducers({
  bookTrendingList: bookTrendingListReducer,
  bookDescription: bookDescriptionReducer,
  bookList: bookListReducer,
  bookCreate: bookCreateReducer,
  bookDelete: bookDeleteReducer,
  bookUpdate: bookUpdateReducer,
  bookCreateReview: bookCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfileDetails: userProfileDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userProfileInfo: userProfileInfoReducer,
  userEdit: userEditReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDispatch: orderDispatchReducer,
  orderShip: orderShipReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderListAll: orderListAllReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
