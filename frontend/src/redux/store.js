import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicantionSlice from "./applicantionSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage for web

// Configuration for redux-persist
const persistConfig = {
  key: "root",        // key for persisted data in storage
  storage,            // use localStorage
  whitelist: ["auth"], // only persist auth slice
};

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authSlice,          // authentication state
  job: jobSlice,            // job-related state
  company: companySlice,    // company-related state
  application: applicantionSlice, // job applicants state
});

// Wrap rootReducer with persistReducer for persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable state check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor for persisting the store
export const persistor = persistStore(store);

export default store;
