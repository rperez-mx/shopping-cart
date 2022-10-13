import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
//Define Item Interface
export interface Item {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}
// Define state interface
interface ItemState {
  items: Array<Item>,
  status: string
}
// Define the initial state
const initialState: ItemState = {
  items: [],
  status: 'empty'
}
export const fetchItems = createAsyncThunk(
  'items/fetchAll',
  async () => {
    const request = await fetch('https://fakestoreapi.com/products')
    const response = await request.json()
    return response.map((item: Item)=>{
      return item
    })
  }
)
export const ItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {

  },
  extraReducers: (builder)=>{
    builder.addCase(fetchItems.pending, (state)=>{
      state.status = 'loading'
    }),
    builder.addCase(fetchItems.fulfilled, (state, action)=>{
      state.items = action.payload
      state.status = 'fulfilled'
    })
  }
})
export default ItemsSlice.reducer