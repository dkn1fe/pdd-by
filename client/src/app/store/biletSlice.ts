import { createSlice } from "@reduxjs/toolkit";
import { onGetQuestions } from "../../shared/api/questionsApi";

interface InitialStateType{
   choosedMode:string,
   activeQuestions:number,
   writeQuestions:number[],
   dontWriteQuestions:number[]
   questions:any[]
   statusQuestions:'idle' | 'loading' 
   choosedBilet:number
}

const initialState:InitialStateType = {
    choosedMode:'',
    activeQuestions:0,
    writeQuestions:[],
    dontWriteQuestions:[],
    questions:[],
    statusQuestions:'idle',
    choosedBilet:0
}

export const biletSlice = createSlice({
    name:'bilet',
    initialState,
    reducers:{
      handleChooseMode:(state,action) => {
         state.choosedMode = action.payload
      },
      handleChooseBilet:(state,action) => {
         state.choosedBilet = action.payload
      },
      onHandleActiveQuestion:(state,action) => {
        state.activeQuestions = action.payload
      },
      onHandleWriteQuestions:(state,action)=>{
        state.writeQuestions = [...state.writeQuestions,action.payload]
      },
      onHandleDontWriteQuestions:(state,action)=>{
        state.dontWriteQuestions = [...state.dontWriteQuestions,action.payload]
      },
      clearQuestions:(state)=>{
        state.writeQuestions = []
        state.dontWriteQuestions = []
      }
    
    },
    extraReducers:(builder)=>{
      builder.addCase(onGetQuestions.pending,(state)=>{
        state.statusQuestions = 'loading'
      })
       builder.addCase(onGetQuestions.fulfilled,(state,action)=>{
        state.questions = action.payload
        state.statusQuestions = 'idle'
       })
    }
})

export const { 
  handleChooseMode,
  onHandleActiveQuestion,
  onHandleWriteQuestions,
  onHandleDontWriteQuestions,
  clearQuestions,
  handleChooseBilet
} = biletSlice.actions
export default biletSlice.reducer