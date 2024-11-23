// redux/updatedFieldsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const editedEshopFieldsSlice = createSlice({
  name: 'updatedFields',
  initialState,
  reducers: {
    setUpdatedField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value; 
    },
    resetUpdatedFields: () => initialState, 
  },
});

export const { setUpdatedField, resetUpdatedFields } = editedEshopFieldsSlice.actions;
export default editedEshopFieldsSlice.reducer;
