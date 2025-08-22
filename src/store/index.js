import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import editedEshopFieldsReducer from './editedEshopFieldsSlice';
import couponReducer from './couponsSlice';
import otpReducer from './otpSlice';
import discountsReducer from './discountsSlice';
import mouReducer from './mouSelectedProductsSlice';
import coHelperReducer from './CoHelperSlice';
import selectedCohelperReducer from './selectedCoHelperSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'discounts', 'coupon', 'mou', 'co_helper', 'selectedCohelper'], // Add only reducers you want to persist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  updatedFields: editedEshopFieldsReducer,
  coupon: couponReducer,
  otp: otpReducer,
  discounts: discountsReducer,
  mou: mouReducer,
  co_helper: coHelperReducer,
  selectedCohelper: selectedCohelperReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // important for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;