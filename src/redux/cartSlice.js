import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open : false,
  items : [],
  discountCopoun : null,
  itemQuantity : {}
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      toggleCart :(state, action)=>{
        return {
          ...state, open : !state.open
        }
      },
      addItemToCart :(state, {payload}) =>{
        if(state.itemQuantity[payload.id]) {state.itemObject[payload.id] = 0}
          state.itemQuantity[payload.id]++;

        
      

  },
}
})


export const { toggleCart } = cartSlice.actions

export default cartSlice.reducer