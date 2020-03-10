import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api';

const initialState = {
  loading: false,
  error: null,
  products: [],
  initialDealers: null,
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess(state, { payload: products }) {
      state.loading = false;
      state.error = null;
      state.products = products;
    },
    getProductsFailed(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const {
  getProductsFailed,
  getProductsStart,
  getProductsSuccess,
} = products.actions;

export default products.reducer;

export const fetchProducts = dealers => async dispatch => {
  try {
    dispatch(getProductsStart());
    const products = await getProducts(dealers);
    dispatch(getProductsSuccess(products));
  } catch (err) {
    dispatch(getProductsFailed(err.toString()));
  }
};
