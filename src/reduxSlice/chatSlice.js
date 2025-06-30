import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chattingUser: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { chattingUser } = chatSlice.actions;

export default chatSlice.reducer;
