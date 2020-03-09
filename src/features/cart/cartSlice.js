import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsCountByName: {},
  items: [],
  totalCount: 0,
};

function deleteItem(state, itemName) {
  state.itemsCountByName = Object.keys(state.itemsCountByName).reduce(
    (acc, item) => {
      if (item !== itemName) {
        const newAcc = { ...acc, [item]: state.itemsCountByName[item] };
        return newAcc;
      }
      return acc;
    },
    {}
  );
  state.items = state.items.filter(name => name !== itemName);
}

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

      const itemCount = state.itemsCountByName[itemName];
      if (itemCount > 1) {
        state.itemsCountByName[itemName] = Math.max(itemCount - 1, 0);
      } else {
        deleteItem(state, itemName);
      }
    },
    deleteFromCart(state, { payload: itemName }) {
      deleteItem(state, itemName);
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cart.actions;

export default cart.reducer;
