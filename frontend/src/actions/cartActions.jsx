import axios from 'axios';
import { CART_ADD_ITEMS } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/books/${id}`);

    dispatch({
      type: CART_ADD_ITEMS,
      payload: {
        _id: data._id,
        title: data.title,
        image: data.image,
        mrp: data.mrp,
        discount: data.discount,
        rating: data.rating,
        language: data.language,
        genre: data.genre,
        category: data.category,
        countInStock: data.countInStock,
        author: data.author,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log(error.message);
  }
};
