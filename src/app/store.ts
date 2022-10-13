import { configureStore } from "@reduxjs/toolkit";
import cartItemSlite from "./features/cartItems/cartItemSlite";
import itemSlice from "./features/items/itemSlice";
import userSlice from "./features/User/userSlice";
export const store = configureStore({
  reducer: {
    items: itemSlice,
    cartItems: cartItemSlite,
    userState: userSlice,
    // cartDetail: cartDetailReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch