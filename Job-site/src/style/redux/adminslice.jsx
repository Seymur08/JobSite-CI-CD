import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    GetAllBlokedWorker, GetAllCategoryEmployer,
    GetAllCategoryWorker,
    GetAllWaitEmployers, GetAllWaitWorkers
} from './AdminFunctions';

const initialState = {
    waitingemployer: [],
    waitingworker: [],
    categoryWorker: [],
    categoryEmployer: [],

    allblockworkers: [],
    allblockemployers: [],

};

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCategoryWorker.fulfilled, (state, action) => {

                state.categoryWorker = action.payload;
            })
            .addCase(GetAllCategoryEmployer.fulfilled, (state, action) => {

                state.categoryEmployer = action.payload;
            })
            .addCase(GetAllWaitWorkers.fulfilled, (state, action) => {

                state.waitingworker = action.payload;
            })
            .addCase(GetAllWaitEmployers.fulfilled, (state, action) => {

                state.waitingemployer = action.payload;
            })
            .addCase(GetAllBlokedWorker.fulfilled, (state, action) => {

                state.allblockworkers = action.payload;
            })




    }
});

export const { } = AdminSlice.actions
export default AdminSlice;
