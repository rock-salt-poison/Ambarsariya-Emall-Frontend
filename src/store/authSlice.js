// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  userAccessToken: localStorage.getItem('accessToken') || null,
  isUserAccessTokenValid: false,
};

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the user access token
    setUserToken: (state, action) => {
      state.userAccessToken = action.payload;
    },
   
    setUserTokenValid: (state, action) => {
      state.isUserAccessTokenValid = action.payload;
    },

    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.userAccessToken = null;
      state.isUserAccessTokenValid = false;
    },
  },
});

// Export actions
export const { 
  setUserToken, 
  setUserTokenValid, 
  clearTokens 
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
