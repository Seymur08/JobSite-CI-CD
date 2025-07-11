import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetAllWorkerJobList, GetWorkerJobId } from './WorkerFunction';

const initialState = {
    workerjobs: [],
    worker: null,
};

export const WorkerSlice = createSlice({
    name: 'worker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllWorkerJobList.fulfilled, (state, action) => {

                state.workerjobs = action.payload;
            })
            .addCase(GetWorkerJobId.fulfilled, (state, action) => {

                state.worker = action.payload;
            })

    }
});

export const { } = WorkerSlice.actions
export default WorkerSlice;
