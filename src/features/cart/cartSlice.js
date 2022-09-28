import { createSlice } from '@reduxjs/toolkit'

const initialCartState = {
    total: 0,
    totalShipping: 0,
    totalProducts: 0,
    list: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      if(state.list.length > 0){
        state.list = state.list.filter((item) => {
          return item.id != action.payload.id
        })
      }
      state.list.push(action.payload)
    },
    removeFromCart: (state, action) => {
      const cartWithoutProduct = state.list.filter((item) => {
        return item.id != action.payload.id
      })
      state.list = cartWithoutProduct;
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer