import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetEmployerJobId } from './AllFuntions';
import { GetAllEmployerJobList } from './EmployerFuntion';

const initialState = {
    employers: [],
    employer: null,
};

export const EmployerSelice = createSlice({
    name: 'employer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllEmployerJobList.fulfilled, (state, action) => {

                state.employers = action.payload;
            })
            .addCase(GetEmployerJobId.fulfilled, (state, action) => {

                state.employer = action.payload;
            })
    }
});

export const { } = EmployerSelice.actions
export default EmployerSelice;


// <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis vero labore laboriosam architecto consectetur in dignissimos unde corrupti consequatur cumque, quaerat esse magni iusto! Fugit repudiandae quam vitae minima et beatae ullam eum optio reiciendis ea sed, totam sint praesentium tempore sequi porro nesciunt asperiores quae blanditiis cumque eaque rerum.</p>