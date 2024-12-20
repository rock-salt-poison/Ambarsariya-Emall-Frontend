import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    retailer: null,      // Store a single coupon instead of an array
    loyalty: null,       // Store a single coupon instead of an array
    subscription: null,  // Store a single coupon instead of an array
    customizable: null,  // Store a single coupon instead of an array
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    // Replace the coupon for a given type
    addCoupon: (state, action) => {
      const { type, coupon } = action.payload;
      if (state[type] !== undefined) {
        state[type] = coupon;  // Replace the existing coupon
      }
    },
    // Remove a coupon (set the value to null or empty based on the type)
    removeCoupon: (state, action) => {
      const { type } = action.payload;
      if (state[type] !== undefined) {
        state[type] = null;  // Reset the coupon value to null
      }
    },
    // Clear the coupon of a specific type (set the value to null)
    clearCoupon: (state, action) => {
      const { type } = action.payload;
      if (state[type] !== undefined) {
        state[type] = null;  // Reset the coupon value to null
      }
    },
  },
});

export const { addCoupon, removeCoupon, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
