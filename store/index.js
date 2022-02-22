import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialSessionState = {
  loggedIn: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState: initialSessionState,
  reducers: {
    login(state, { type, payload }) {
      Cookies.set("token", payload);
      state.loggedIn = true;
    },
    logout(state) {
      Cookies.remove("token");
      state.loggedIn = false;
    },
  },
});

const store = configureStore({
  reducer: { session: sessionSlice.reducer },
});

export const sessionActions = sessionSlice.actions;

export default store;
