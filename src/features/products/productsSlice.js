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
        console.error("Make sure to run json-server in order to access the API data");
        throw err;
      });
      return response.data.GBP
    }
  )
  
export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    setProd: (state, action) => {
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
      state.message = action.payload;
      state.isSuccess = false;
    })
  },
});


export const { setProd } = productsSlice.actions

export default productsSlice.reducer