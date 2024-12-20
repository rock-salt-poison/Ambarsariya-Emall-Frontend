import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import editedEshopFieldsReducer from './editedEshopFieldsSlice'
import couponReducer from './couponsSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    updatedFields: editedEshopFieldsReducer,
    coupon: couponReducer,
  },
});

export default store;
