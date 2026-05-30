import { createSlice } from "@reduxjs/toolkit";

export type modalSliceType = {
    isOpen: boolean
}

const initialState: modalSliceType = {
    isOpen: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});


export const modalReducer = modalSlice.reducer;


export const { openModal, closeModal } = modalSlice.actions;

