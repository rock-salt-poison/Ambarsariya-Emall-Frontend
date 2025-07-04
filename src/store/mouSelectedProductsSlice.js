import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  selectedProductAndShops: null,
};

// Create auth slice
const mouSelectedProductsSlice = createSlice({
  name: 'mou',
  initialState,
  reducers: {
    // Action to set the user access token
    setSelectedProductAndShops: (state, action) => {
      state.selectedProductAndShops = action.payload;
    },

    // Action to clear all tokens (e.g., on logout)
    clearTokens: (state) => {
      state.selectedProductAndShops = null;
    },
  },
});

// Export actions
export const { 
  setSelectedProductAndShops,  
  clearTokens 
} = mouSelectedProductsSlice.actions;

// Export reducer
export default mouSelectedProductsSlice.reducer;
