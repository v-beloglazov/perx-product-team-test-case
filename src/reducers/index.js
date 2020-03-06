import { combineReducers } from 'redux';
import goodsSlice from '../features/goods/goodsSlice'

export default combineReducers({
  goods: goodsSlice
});
