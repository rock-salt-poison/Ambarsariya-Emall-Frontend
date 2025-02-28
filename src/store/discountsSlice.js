// store/discountsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoupon: null, // Object to store the single selected coupon
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    addCoupon: (state, action) => {
        state.selectedCoupon = action.payload;
      },
      removeCoupon: (state) => {
        state.selectedCoupon = null; // Remove the coupon
      },
      resetCoupons: (state) => {
        state.selectedCoupon = null; // Reset the selected coupon
      },
    },
});

export const { addCoupon, removeCoupon, resetCoupons } = discountsSlice.actions;
export default discountsSlice.reducer;
