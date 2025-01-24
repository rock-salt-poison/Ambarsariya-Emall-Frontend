import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import editedEshopFieldsReducer from './editedEshopFieldsSlice'
import couponReducer from './couponsSlice';
import otpReducer from './otpSlice';
import discountsReducer from './discountsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    updatedFields: editedEshopFieldsReducer,
    coupon: couponReducer,
    otp: otpReducer,
    discounts: discountsReducer
  },
});

export default store;
