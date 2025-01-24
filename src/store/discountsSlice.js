// store/discountsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoupons: [], // Array to store selected coupons
  totalDiscount: 0, // Total discount
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    addCoupon: (state, action) => {
      const { couponId, discountAmount } = action.payload;
      if (!state.selectedCoupons.some((coupon) => coupon.couponId === couponId)) {
        state.selectedCoupons.push({ couponId, discountAmount });
        state.totalDiscount += discountAmount;
      }
    },
    removeCoupon: (state, action) => {
      const { couponId } = action.payload;
      const coupon = state.selectedCoupons.find(
        (coupon) => coupon.couponId === couponId
      );
      if (coupon) {
        state.selectedCoupons = state.selectedCoupons.filter(
          (coupon) => coupon.couponId !== couponId
        );
        state.totalDiscount -= coupon.discountAmount;
      }
    },
    resetCoupons: (state) => {
      state.selectedCoupons = [];
      state.totalDiscount = 0;
    },
  },
});

export const { addCoupon, removeCoupon, resetCoupons } = discountsSlice.actions;
export default discountsSlice.reducer;
