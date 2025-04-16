import {createSlice} from '@reduxjs/toolkit'

interface modalState{
    closeModal: boolean
}

const initialState: modalState ={
    closeModal: false
}
export const modalSlice = createSlice({
    name: "dismissModal",
    initialState,
    reducers:{
        dismiss: (state, action:{payload: boolean})=>{
            state.closeModal = action.payload;
        }
    }
})

export const {dismiss} = modalSlice.actions;
export default modalSlice.reducer;