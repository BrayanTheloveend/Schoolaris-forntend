import { configureStore } from '@reduxjs/toolkit'
import { ApiSlice } from './ApiSlice'
import reduxSlice from './ReduxSlice'

const store = configureStore({
    reducer:{
        [ApiSlice.reducerPath] : ApiSlice.reducer,
        storage : reduxSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(ApiSlice.middleware)
})

export default store