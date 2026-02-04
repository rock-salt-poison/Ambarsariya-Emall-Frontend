import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  usernameOtp: null,
  phoneOtp: null,
};

// Create auth slice
const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    // Action to set the user access token
    setUsernameOtp: (state, action) => {
      state.usernameOtp = action.payload;
    },

    // Action to set the phone OTP
    setPhoneOtp: (state, action) => {
      state.phoneOtp = action.payload;
    },

    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.usernameOtp = null;
      state.phoneOtp = null;
    },
  },
});

// Export actions
export const { 
  setUsernameOtp,
  setPhoneOtp,
  clearTokens 
} = otpSlice.actions;

// Export reducer
export default otpSlice.reducer;
