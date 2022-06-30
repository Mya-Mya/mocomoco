import { combineReducers } from "@reduxjs/toolkit";
import warningsReducer from "./warningsSlice";
import documentsReducer from "./documents";
export default combineReducers({
  warnings: warningsReducer,
  documents: documentsReducer,
});
