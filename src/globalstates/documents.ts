import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { persistReducer } from "redux-persist";

export type Document = {
  title: string;
  content: string;
};
const initialState: { [id: string]: Document } = {
  "1": {
    title: "example.html",
    content: "<h1>Hello Mocomoco</h1>",
  },
};

const slice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    createDocument: (state, action: { payload: Document }) => {
      const id = nanoid();
      state[id] = action.payload;
    },
    deleteDocument: (state, action: { payload: string }) => {
      delete state[action.payload];
    },
  },
});

export const { createDocument, deleteDocument } = slice.actions;
export default persistReducer(
  {
    key: "documents",
    throttle: 100,
    storage: localStorage,
  },
  slice.reducer
);
