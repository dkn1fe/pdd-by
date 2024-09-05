import { configureStore } from '@reduxjs/toolkit'
import biletSlice from './biletSlice'



export const store = configureStore({
  reducer:{
    biletSlice
  }
})
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


