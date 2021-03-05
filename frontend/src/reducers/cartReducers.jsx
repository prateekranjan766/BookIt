import { CART_ADD_ITEMS } from '../constants/cartConstants';

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
    default:
      return state;
  }
};
