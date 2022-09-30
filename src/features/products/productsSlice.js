import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios';

const initialProductsState = {
    loading: false,
    message: '',
    isSuccess: false,
    products: [],
    selectedProduct: {}
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (userId, thunkAPI) => {
      const response = await axios({
        method: "get",
        url: "http://localhost:8080/products/"
      }).catch(function (err) {
        console.error("Make sure to run json-server in order to access the API data.   --->>>   ", err);
        throw err;
      });
      return response.data.GBP
    }
  )
  
export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const product = state.products.find((product) => {
        return product.id == action.payload
      })
      state.selectedProduct = product;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.products = action.payload;
      state.newers = action.payload.filter((product) => {
        return product.newest === true;
      });
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.message = "Was not possible to receive the data. Make sure to run Json-server in order to access the API data. Use the command 'npm run json-server', then open a new terminal and execute 'npm run start'.";
      state.isSuccess = false;
    })
  },
});


export const { setSelectedProduct } = productsSlice.actions

export default productsSlice.reducer