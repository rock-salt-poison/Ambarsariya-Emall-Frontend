import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: [],
  currentShopNo: null, // Track current shop_no
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newShopNo = action.payload.shop_no;

      if (state.currentShopNo !== newShopNo) {
        // Overwrite products if shop_no is different
        state.selectedProducts = [action.payload];
        state.currentShopNo = newShopNo;
      } else {
        // Add product if same shop
        state.selectedProducts.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.product_no !== action.payload
      );
    },
    clearCart: (state) => {
      state.selectedProducts = [];
      state.currentShopNo = null; // Reset shop_no
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
