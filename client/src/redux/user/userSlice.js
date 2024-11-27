// redux/slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  token: "",
  team: null, // Store the user's team
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.email = "";
      state.token = "";
      state.team = null; // Clear the user's team when logging out
    },
    setTeam: (state, action) => {
      state.team = action.payload; // Set user's team info
    },
  },
});

export const { setUser, clearUser, setTeam } = userSlice.actions;
export default userSlice.reducer;
