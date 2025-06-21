import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        addItems : (state , action)=>{
            console.log(action)
            const itemExists = state.items.some(item => item.id === action.payload.id);
            if (!itemExists) {
                state.items.push(action.payload);
            }
        },
        removeItem : (state , action)=>{
            console.log(action.payload)
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart : (state , action)=>{
            state.items.length = 0
        }
    }
})

export const {addItems , clearCart , removeItem} = CartSlice.actions;
export default CartSlice.reducer