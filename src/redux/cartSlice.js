import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  open: false,
  items: [],
  discountCopoun: false,
  itemQuantity: {},
  totalPrice : 0,
  discountPrice : 0,
  taxRate : 0.18
};

export const applyCopounThunk = createAsyncThunk('cart/applyCopoun', async (data) => {
  debugger
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000/api'}/apply-copoun`, data);
    if(response.status == 200) {
      return response.data.data;
    } else {
      return null
    }
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
});


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      return {
        ...state,
        open: !state.open,
      };
    },
    addItemToCart: (state, { payload }) => {
      if (state.itemQuantity[payload.id] ) {
        return {
          ...state,
          itemQuantity: { ...state.itemQuantity, [payload.id]: state.itemQuantity[payload.id] + 1 },
        };
      } else {
        return {
          ...state,
          items: [...state.items, payload.item],
          itemQuantity: { ...state.itemQuantity, [payload.id]: 1 },
        };
      }
    },
    removeItemFromCart: (state, { payload }) => {
      const currentCount = state.itemQuantity[payload.id] 
      if (currentCount> 1) {
        return {
         ... state,
          itemQuantity: { ...state.itemQuantity,[payload.id]: state.itemQuantity[payload.id] - 1 },
        };
      }  else {
        return {...state, items : state.items.filter(i=> i.id !== payload.id), itemQuantity : {...state.itemQuantity, [payload.id] : null } }
      }
    },
  },
  extraReducers : (builder) =>{
    builder
      .addCase(applyCopounThunk.fulfilled, (state,{payload}) => {
        console.log(payload, "thisis payload")
        debugger
        if(payload) {
          state.discountPrice = payload.discountAmount
          state.discountCopoun = true 
        }
      })
  }
});






export const { toggleCart ,addItemToCart,removeItemFromCart} = cartSlice.actions;

export default cartSlice.reducer;
