// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  shopAccessToken: localStorage.getItem('shopAccessToken') || null,
  userAccessToken: localStorage.getItem('userAccessToken') || null,
  isShopAccessTokenValid: false,
  isUserAccessTokenValid: false,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the shop access token
    setShopToken: (state, action) => {
      state.shopAccessToken = action.payload;
    },
    // Action to set the user access token
    setUserToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
    // Action to set token validity (true/false) for shop and user tokens
    setShopTokenValid: (state, action) => {
      state.isShopAccessTokenValid = action.payload;
    },
    setUserTokenValid: (state, action) => {
      state.isUserAccessTokenValid = action.payload;
    },
    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.shopAccessToken = null;
      state.userAccessToken = null;
      state.isShopAccessTokenValid = false;
      state.isUserAccessTokenValid = false;
    },
  },
});

// Export actions
export const { setShopToken, setUserToken, setShopTokenValid, setUserTokenValid, clearTokens } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
