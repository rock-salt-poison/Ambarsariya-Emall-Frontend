import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import editedEshopFieldsReducer from './editedEshopFieldsSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    updatedFields: editedEshopFieldsReducer,
  },
});

export default store;
