import { createSlice } from '@reduxjs/toolkit';
import { getGoods } from '../../api';

const initialState = {
  loading: false,
  error: null,
  goods: [],
};

const goods = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    getGoodsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getGoodsSuccess(state, { payload: goods }) {
      state.loading = false;
      state.error = null;
      state.goods = goods;
    },
    getGoodsFailed(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { getGoodsFailed, getGoodsStart, getGoodsSuccess } = goods.actions;

export default goods.reducer;

export const fetchGoods = dealers => async dispatch => {
  try {
    dispatch(getGoodsStart());
    const goods = await getGoods(dealers);
    dispatch(getGoodsSuccess(goods));
  } catch (err) {
    dispatch(getGoodsFailed(err.toString()));
  }
};
