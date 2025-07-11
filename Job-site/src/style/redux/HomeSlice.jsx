import { createSlice } from '@reduxjs/toolkit';
import { AllAdvertCount, GetAllPermissionEmployers, GetAllPermissionWorkers, GetUserAbout } from './HomeFunction';
// import { createConnection } from './SignalRSlice';
// import { GetAllPermissionEmployers, GetAllPermissionWorkers } from './HomeFunction';
// import signalRReducer from './SignalRSlice'

const initialState = {
    allokworkers: {
        items: [],
        meta: {}
    },
    allokEmployers: {
        items: [],
        meta: {}
    },
    userabout: null


};

export const HomeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        clearUserAbout: (state) => {
            state.userabout = null; // burada sıfırlayırıq
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllPermissionWorkers.fulfilled, (state, action) => {
                state.allokworkers.items = action.payload.items;
                state.allokworkers.meta = action.payload.meta;
            })
            .addCase(GetAllPermissionEmployers.fulfilled, (state, action) => {

                state.allokEmployers.items = action.payload.items;
                state.allokEmployers.meta = action.payload.meta;
            })
            .addCase(AllAdvertCount.fulfilled, (state, action) => {

                state.alladvertcount = action.payload;
            })
            .addCase(GetUserAbout.fulfilled, (state, action) => {

                state.userabout = action.payload;
            })

    }
});

export const { clearUserAbout } = HomeSlice.actions
export default HomeSlice;
