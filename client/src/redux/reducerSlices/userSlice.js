import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: "",
  id: "",
  userDetails: {},
  isLoggedIn: false,
};

const countSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    setLoginDetails: (state, actions) => {},

    logout: (state) => {},
  },
});

export const { setLoginDetails, logout } = countSlice.actions;

export default countSlice.reducer;
