import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  userAccessToken: localStorage.getItem('accessToken') || null,
  isUserAccessTokenValid: false,
  visitorAccessToken: localStorage.getItem('visitorAccessToken') || null, // Visitor token
  isVisitorAccessTokenValid: false, // To track visitor token validity
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

    // Action to set the validity of user token
    setUserTokenValid: (state, action) => {
      state.isUserAccessTokenValid = action.payload;
    },

    // Action to set the visitor access token
    setVisitorToken: (state, action) => {
      state.visitorAccessToken = action.payload;
    },

    // Action to set the validity of visitor token
    setVisitorTokenValid: (state, action) => {
      state.isVisitorAccessTokenValid = action.payload;
    },

    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.userAccessToken = null;
      state.isUserAccessTokenValid = false;
      state.visitorAccessToken = null;
      state.isVisitorAccessTokenValid = false;
    },
  },
});

// Export actions
export const { 
  setUserToken, 
  setUserTokenValid, 
  setVisitorToken, 
  setVisitorTokenValid, 
  clearTokens 
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
