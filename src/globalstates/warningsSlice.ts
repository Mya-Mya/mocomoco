import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shouldShowXSSWarning: true,
};

const slice = createSlice({
  name: "warnings",
  initialState,
  reducers: {
    hideXSSWarning: (state) => {
      state.shouldShowXSSWarning = false;
    },
  },
});

export const { hideXSSWarning } = slice.actions;
export default slice.reducer;
