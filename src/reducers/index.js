import { combineReducers } from 'redux';
import goodsSlice from '../features/goods/goodsSlice';
import cartSlice from '../features/cart/cartSlice';

export default combineReducers({
  goods: goodsSlice,
  cart: cartSlice,
});
