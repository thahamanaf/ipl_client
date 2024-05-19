import { configureStore  } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
