import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialProductsState = {
    loading: false,
    message: '',
    isSuccess: false,
    products: [],
    productsCurrencyInfo: {
      locale: "",
      currencyCode: ""
    }
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (userId, thunkAPI) => {
      const response = await axios({
        method: "get",
        url: "https://90shop-api.vercel.app/products/GBP"
      }).catch(function (err) {
        console.error("Some error occurred. Was not possible to receive the data. Please, contact the admin.   --->>>   ", err);
        throw err;
      });
      return response.data;
    }
  );
  
export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.message = 'Loading...';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.products = action.payload;
      state.productsCurrencyInfo.locale = action.payload[0].price.currencyInfo.locale;
      state.productsCurrencyInfo.currencyCode = action.payload[0].price.currencyInfo.currencyCode;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.message = "Some error occurred and the application was not able to receive the data. Please, contact the admin. See console for further information.";
      state.isSuccess = false;
    });
  },
});

export default productsSlice.reducer;