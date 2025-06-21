import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
    name : "card",
    initialState : {
        allCards : []
    },
    reducers : {
        cards : (state , action)=>{
            state.allCards = action.payload
        },
        removeCard : (state , action)=>{
            console.log(action.payload)
            state.allCards = state.allCards.filter(card => card.id !== action.payload.id)
            
        }
    }
})

export const {cards , removeCard} = CardSlice.actions;
export default CardSlice.reducer