import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    choosedMode:'',
    activeQuestions:1,
    writeQuestions:[],
    dontWriteQuestions:[]
}

export const biletSlice = createSlice({
    name:'bilet',
    initialState,
    reducers:{
      handleChooseMode:(state,action) => {
         state.choosedMode = action.payload
      },
      onHandleActiveQuestion:(state,action) => {
        state.activeQuestions = action.payload
      },
      onHandleWriteQuestions:(state,action)=>{
        state.writeQuestions = [...state.writeQuestions,action.payload]
      },
      onHandleDontWriteQuestions:(state,action)=>{
        state.dontWriteQuestions = [...state.dontWriteQuestions,action.payload]
      }
    }
})

export const { handleChooseMode,onHandleActiveQuestion,onHandleWriteQuestions,onHandleDontWriteQuestions} = biletSlice.actions
export default biletSlice.reducer