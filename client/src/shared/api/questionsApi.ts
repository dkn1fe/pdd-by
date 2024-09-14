import {createAsyncThunk} from '@reduxjs/toolkit'

export const onGetQuestions = createAsyncThunk(
    'getQuestion',
    async() => {
        const response = await fetch('http://localhost:3000/api/questions')
        return await response.json()
    }
)