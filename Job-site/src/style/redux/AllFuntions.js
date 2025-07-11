import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './axiosInstance';

const GetLogin = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post("http://localhost:5156/api/Auth/Login", data)
        localStorage.setItem("accessToken", response.data.token);
        return response.data;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
            return rejectWithValue(err.response.data.errors);
        }
        return rejectWithValue({ general: 'Unknown error' });
    }

})




const GetEmployerJobId = createAsyncThunk('Employer/GetAdvertEmployerById', async (id) => {
    const accessToken = localStorage.getItem("accessToken");

    const response = await api.post("/Employer/GetAdvertEmployerById", { id },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data;
})



const GetAllWorkerJobList = createAsyncThunk('worker', async () => {
    const response = await api.post("http://localhost:5156/api/Worker/Register")

    return response.data;
})


export {
    GetLogin, GetEmployerJobId, GetAllWorkerJobList,
}
