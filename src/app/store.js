import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reduxSlice/UserSlice";

export const store = configureStore({
  reducer: {
    userLogin: userSlice,
  },
});
