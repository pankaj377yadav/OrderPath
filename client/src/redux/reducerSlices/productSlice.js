import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  id: "",
  productDetails: {},
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    setProductDetails: (state, actions) => {
      const {  productInfo} = actions.payload;
      return{
        ...state,
        productDetails: productInfo
      };
    },

// changeUserDetails: (state, actions) => {
// state.userDetails = actions.payload
// },
//     logout: (state) => {
//       return{
//         ...initialState
//       }
//     },
  },
});

export const { setProductDetails } = productSlice.actions;

export default productSlice.reducer;
