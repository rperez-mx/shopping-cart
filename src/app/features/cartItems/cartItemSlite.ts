import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import itemSlice, { Item } from "../items/itemSlice";
// Define CartItem Interface
export interface CartItem {
  id: number,
  title: string,
  description: string,
  quantity: number,
  price: number,
  imageUrl: string,
  grand: number
}
// Define updateQuantity Props
interface updateQuantityProps {
  id: number,
  quantity: number
}
// Define state interface
interface CartItemState {
  cartItems: Array<CartItem>,
  status: string
}
//  Define initial state
const initialState: CartItemState = {
  cartItems: [],
  status: 'empty'
}
export const CartItemSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Item>) => {
      let doesExist: boolean = false
      let quantity = 0
      state.cartItems.forEach((cartItem) => {
        if (cartItem.id == action.payload.id) {
          quantity = cartItem.quantity
          doesExist = true
        }
      })
      if (!doesExist) {
        let cartItem: CartItem = {} as CartItem
        cartItem.id = action.payload.id
        cartItem.title = action.payload.title
        cartItem.description = action.payload.description
        cartItem.imageUrl = action.payload.image
        cartItem.price = action.payload.price
        cartItem.quantity = 1
        cartItem.grand = cartItem.price * cartItem.quantity
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem]
        }
      } else {
        const item = state.cartItems.find((item) => item.id === action.payload.id);

        if (item) {
          item.quantity += 1;
          item.grand = item.price * item.quantity
        }
      }
    },
    updateQuantity: (state, action: PayloadAction<updateQuantityProps>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity = action.payload.quantity;
        item.grand = item.price * item.quantity
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload)
      }
    },
    populateState: (state, action: PayloadAction<Array<CartItem>>)=>{
      return {
        ...state,
        cartItems : action.payload
      }
    }



  }
})
export const { add, updateQuantity, deleteItem, populateState } = CartItemSlice.actions
export default CartItemSlice.reducer