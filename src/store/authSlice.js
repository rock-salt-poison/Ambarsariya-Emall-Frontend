// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  shopAccessToken: localStorage.getItem('shopAccessToken') || null,
  userAccessToken: localStorage.getItem('userAccessToken') || null,
  memberAccessToken: localStorage.getItem('memberAccessToken') || null, // Added member token
  isShopAccessTokenValid: false,
  isUserAccessTokenValid: false,
  isMemberAccessTokenValid: false, // Added validity flag for member token
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
    // Action to set the member access token
    setMemberToken: (state, action) => {
      state.memberAccessToken = action.payload;
    },
    // Action to set token validity (true/false) for shop, user, and member tokens
    setShopTokenValid: (state, action) => {
      state.isShopAccessTokenValid = action.payload;
    },
    setUserTokenValid: (state, action) => {
      state.isUserAccessTokenValid = action.payload;
    },
    setMemberTokenValid: (state, action) => {
      state.isMemberAccessTokenValid = action.payload;
    },
    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.shopAccessToken = null;
      state.userAccessToken = null;
      state.memberAccessToken = null;
      state.isShopAccessTokenValid = false;
      state.isUserAccessTokenValid = false;
      state.isMemberAccessTokenValid = false;
    },
  },
});

// Export actions
export const { 
  setShopToken, 
  setUserToken, 
  setMemberToken, // Exported new action
  setShopTokenValid, 
  setUserTokenValid, 
  setMemberTokenValid, // Exported new action
  clearTokens 
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
