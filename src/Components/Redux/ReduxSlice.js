import { createSlice } from "@reduxjs/toolkit";
//import {v4 as uuid} from 'uuid'


const initialState = {
    percentNote: 70
}

const reduxSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        setStorage(state, {payload}){
            return state = {...state, percentNote: payload}
        }
    }


})

export const { setStorage } = reduxSlice.actions
export default reduxSlice