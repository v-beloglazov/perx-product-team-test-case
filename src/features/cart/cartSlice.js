import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsCountByName: {},
  items: [],
  totalCount: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload: itemName }) {
      state.totalCount = state.totalCount + 1;

      if (state.items.includes(itemName)) {
        state.itemsCountByName[itemName] = state.itemsCountByName[itemName] + 1;
      } else {
        state.items.push(itemName);
        state.itemsCountByName[itemName] = 1;
      }
    },
    removeFromCart(state, { payload: itemName }) {
      state.totalCount = state.totalCount - 1;

      if (state.itemsCountByName[itemName] > 1) {
        state.itemsCountByName[itemName] = state.itemsCountByName[itemName] - 1;
      } else {
        state.items = state.items.filter(name => name !== itemName);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cart.actions;

export default cart.reducer;
