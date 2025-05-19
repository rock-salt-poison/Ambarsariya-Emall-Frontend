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
      const newProduct = action.payload;
      const newShopNo = newProduct.shop_no;

      if (state.currentShopNo !== newShopNo) {
        // New shop: overwrite cart
        state.selectedProducts = [newProduct];
        state.currentShopNo = newShopNo;
      } else {
        // Same shop: check for existing product
        const index = state.selectedProducts.findIndex(
          (product) =>
            product.product_id === newProduct.product_id &&
            product.product_no === newProduct.product_no
        );

        if (index !== -1) {
          // Replace existing product
          state.selectedProducts[index] = newProduct;
        } else {
          // Add new product
          state.selectedProducts.push(newProduct);
        }
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
