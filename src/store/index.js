import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import categoryApi from "../api/category";
import publishingCompanyApi from "../api/publishingCompany";
import authorApi from "../api/author";
import bookApi from "../api/book";
import authApi from "../api/auth";
import userApi from "../api/user";
import cartApi from "../api/cart";
import cartSlice from "../slices/cart";
import couponsApi from "../api/coupons";
import orderApi from "../api/order";
const persistConfig = {
  key: "root",
  storage,
  whitelist: [cartSlice.name],
};
const rootReducer = combineReducers({
  [categoryApi.reducerPath]: categoryApi.reducer,
  [publishingCompanyApi.reducerPath]: publishingCompanyApi.reducer,
  [authorApi.reducerPath]: authorApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [couponsApi.reducerPath]: couponsApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(categoryApi.middleware)
      .concat(publishingCompanyApi.middleware)
      .concat(authorApi.middleware)
      .concat(bookApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(cartApi.middleware)
      .concat(couponsApi.middleware)
      .concat(orderApi.middleware),
});
const persistor = persistStore(store);
export { store, persistor };
