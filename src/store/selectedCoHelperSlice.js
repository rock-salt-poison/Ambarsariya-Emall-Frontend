// store/selectedCohelperSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCohelper: null, // Object to store the single selected cohelper
};

const selectedCohelperSlice = createSlice({
  name: "selectedCohelper",
  initialState,
  reducers: {
    addCohelper: (state, action) => {
        state.selectedCohelper = action.payload;
      },
      removeCohelper: (state) => {
        state.selectedCohelper = null; // Remove the cohelper
      },
      resetCohelper: (state) => {
        state.selectedCohelper = null; // Reset the selected cohelper
      },
    },
});

export const { addCohelper, removeCohelper, resetCohelper } = selectedCohelperSlice.actions;
export default selectedCohelperSlice.reducer;
