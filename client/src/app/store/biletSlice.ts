import { createSlice } from "@reduxjs/toolkit";
import { onGetQuestions } from "../../shared/api/questionsApi";

interface InitialStateType{
   choosedMode:string,
   activeQuestions:number,
   writeQuestions:number[],
   dontWriteQuestions:number[]
   questions:any[]
   statusQuestions:'idle' | 'loading'
   resultStatus:'controlWindow' | 'result' | ''
   yoursUnWriteAnswers:number[]
   choosedBilet:number
}

const initialState:InitialStateType = {
    choosedMode:'',
    activeQuestions:0,
    writeQuestions:[],
    resultStatus:'',
    dontWriteQuestions:[],
    questions:[],
    yoursUnWriteAnswers:[],
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
        state.yoursUnWriteAnswers = []
        state.choosedBilet = 0
      },
      handleChangeResultStatus:(state,action)=>{
        state.resultStatus = action.payload
      },
      handleChangeYourAnswer:(state,action)=>{
        state.yoursUnWriteAnswers = [...state.yoursUnWriteAnswers,action.payload]
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
  handleChooseBilet,
  handleChangeResultStatus,
  handleChangeYourAnswer

} = biletSlice.actions
export default biletSlice.reducer