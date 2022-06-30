import { configureStore } from "@reduxjs/toolkit";
import _ReduxThunk from "redux-thunk";
import global from "./globalstates";

const store = configureStore({
  reducer: {
    global,
  },
});
export default store;
