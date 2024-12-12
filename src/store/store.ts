import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./cryptoApi";
import layoutReducer from './layoutSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        layout:layoutReducer,
        theme:themeReducer
    },

    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch