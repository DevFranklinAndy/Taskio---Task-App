import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PERSIST,
  PAUSE,
  PURGE,
  REHYDRATE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import rootReducer from "./ReduxStates";
import storage from "redux-persist/lib/storage";

const config = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(config, rootReducer);

export const ReduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PERSIST, PAUSE, PURGE, REHYDRATE, REGISTER],
      },
    }),
});
