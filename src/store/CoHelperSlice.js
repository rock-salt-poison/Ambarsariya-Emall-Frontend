import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coHelpers: [],
  currentMemberId: null, // Track current member_id
};

const coHelperSlice = createSlice({
  name: "co_helper",
  initialState,
  reducers: {
    addCoHelper: (state, action) => {
      const newCoHelper = action.payload;
      const newMemberId = newCoHelper.member_id;

      if (state.currentMemberId !== newMemberId) {
        // New member_id: overwrite coHelper
        state.coHelpers = [newCoHelper];
        state.currentMemberId = newMemberId;
      } else {
        // Same member_id: check for existing coHelper
        const index = state.coHelpers.findIndex(
          (coHelper) =>
            coHelper.member_id === newCoHelper.member_id &&
            coHelper.co_helper_type === newCoHelper.co_helper_type
        );

        if (index !== -1) {
          // Replace existing coHelper
          state.coHelpers[index] = newCoHelper;
        } else {
          // Add new coHelper
          state.coHelpers.push(newCoHelper);
        }
      }
    },
    removeCoHelper: (state, action) => {
      state.coHelpers = state.coHelpers.filter(
        (coHelper) => coHelper.co_helper_type !== action.payload
      );
    },
    clearCoHelper: (state) => {
      state.coHelpers = [];
      state.currentMemberId = null; // Reset member_id
    },
  },
});

export const { addCoHelper, removeCoHelper, clearCoHelper } = coHelperSlice.actions;
export default coHelperSlice.reducer;
