import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.config";
// console.log(auth)
const initialState = {
  value: auth.currentUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, action) => {
      state.value = action.payload;
    },
    // userdata: (state) => {},
  },
});

export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
