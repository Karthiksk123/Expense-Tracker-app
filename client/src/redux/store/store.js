import {configureStore} from '@reduxjs/toolkit'
import apiSlice from '../api/apiSlice'
import { expenseSlice } from '../reducers/reducer'


export const store = configureStore({
    reducer:{
        expense : expenseSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware:getDefaultMiddleware=> getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store