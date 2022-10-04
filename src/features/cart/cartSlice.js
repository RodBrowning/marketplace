import { createSlice } from '@reduxjs/toolkit';
import { roundToTwoDecimals } from '../../utils/utils';

const initialCartState = {
    total: 0,
    totalShipping: 0,
    totalProducts: 0,
    list: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      if(action.payload.quantity === undefined){
        action.payload.quantity = 1;
      }

      action.payload.totalToPay = action.payload.price.value * action.payload.quantity;
      state.list.push(action.payload);

      const totalProducts = state.list.reduce((sum, product) => (sum += product.totalToPay), 0);
      const totalShipping = action.payload.freeShipping ? 0 : action.payload.price.shipping;

      state.totalProducts = roundToTwoDecimals(totalProducts);
      state.totalShipping += roundToTwoDecimals(totalShipping);

      const total = totalProducts + state.totalShipping;
      state.total = roundToTwoDecimals(total);

      state.list = [...state.list].sort((a,b) => {
        return (
            a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 
            ((b.title.toLowerCase() > a.title.toLowerCase()) ? 1 : 
            0)
        });
    },
    removeFromCart: (state, action) => {
      const quantity = state.list.find((product) => product.id === action.payload.id).quantity;
      const totalProducts = state.totalProducts - (action.payload.price.value * quantity);
      const totalShipping = action.payload.freeShipping ? 0 : action.payload.price.shipping;

      state.totalProducts = roundToTwoDecimals(totalProducts);
      state.totalShipping = roundToTwoDecimals((state.totalShipping - totalShipping));
      
      const sumToPay = state.totalProducts + state.totalShipping;
      state.total = roundToTwoDecimals(sumToPay);
      
      const cartWithoutProduct = state.list.filter((item) => {
        return item.id !== action.payload.id
      })
      state.list = cartWithoutProduct;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;