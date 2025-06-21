import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../StoreSlice/CartSlice"
import cardReducer from "../StoreSlice/CardSlice"
const store  = configureStore({
    reducer : {
        cart : cartReducer,
        card : cardReducer

    }
})

export default store