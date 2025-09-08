import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "../reduxSlice/chatSlice";
import userSlice from "../reduxSlice/userSlice";

export const store = configureStore({
  reducer: {
    userLogin: userSlice,
    chatInfo: chatSlice,
  },
});
