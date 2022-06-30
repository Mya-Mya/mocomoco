import { createSlice } from "@reduxjs/toolkit";
import {} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const initialState = {
  deleteConfirmDialogOpen: false,
  deletingSymbolId: null,
};

const slice = createSlice({
  name: "warnings",
  initialState,
  reducers: {
    showDeleteConfirmDialog: (state, action) => {
      state.deleteConfirmDialogOpen = true;
      state.deletingSymbolId = action.payload;
    },
    hideDeleteConfirmDialog: (state) => {
      state.deleteConfirmDialogOpen = false;
      state.deletingSymbolId = null;
    },
  },
});

export const { showDeleteConfirmDialog, hideDeleteConfirmDialog } =
  slice.actions;
export default slice.reducer;
