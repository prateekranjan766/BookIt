import {
  CART_EMPTY,
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      const itemExists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (itemExists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
      } else {
        return { cartItems: [action.payload, ...state.cartItems] };
      }
    case CART_REMOVE_ITEMS:
      return {
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        shippingAddress: action.payload,
        ...state,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        paymentMethod: action.payload,
        ...state,
      };
    case CART_EMPTY:
      localStorage.removeItem('cartItems');
      return { cartItems: [] };
    default:
      return state;
  }
};
