import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialProductsState = {
    loading: false,
    message: '',
    isSuccess: false,
    products: [],
    selectedProduct: {},
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
        url: "https://mock-products.herokuapp.com/products/"
      }).catch(function (err) {
        console.error("Make sure to run json-server in order to access the API data.   --->>>   ", err);
        throw err;
      });
      return response.data.GBP;
    }
  );
  
export const productsSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const product = state.products.find((product) => {
        return product.id === Number(action.payload)
      })
      state.selectedProduct = product;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.products = action.payload;
      state.newest = action.payload.filter((product) => {
        return product.newest === true;
      });
      state.productsCurrencyInfo.locale = action.payload[0].price.currencyInfo.locale;
      state.productsCurrencyInfo.currencyCode = action.payload[0].price.currencyInfo.currencyCode;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.message = "Was not possible to receive the data. Make sure to run Json-server in order to access the API. In a another terminal run the command 'npm run json-server'.";
      state.isSuccess = false;
    });
  },
});


export const { setSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;