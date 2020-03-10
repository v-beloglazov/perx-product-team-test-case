import { combineReducers } from 'redux';
import productsSlice from '../features/products/productsSlice';
import cartSlice from '../features/cart/cartSlice';

export default combineReducers({
  products: productsSlice,
  cart: cartSlice,
});
