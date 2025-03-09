import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Đảm bảo `authSlice.js` tồn tại

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
