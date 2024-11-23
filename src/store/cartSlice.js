import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.selectedProducts.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
