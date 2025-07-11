import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./axiosInstance";


// const GetRegister = createAsyncThunk('Register', async (data) => {
//     const response = await axios.post("http://localhost:5156/api/Worker/Register", data)
//     return response.data;
// })


const GetWorkerJobId = createAsyncThunk('GetAdvertWorkerById', async (id) => {
    const response = await api.post("/Worker/GetAdvertWorkerById", { id })
    console.log(response.data)
    return response.data;
})


const GetAllWorkerJobList = createAsyncThunk('GetAllWorkerJobs', async () => {
    const response = await api.get("/Worker/GetAllWorkerJobs")
    return response.data;
})


const RemoveAdvertisement = createAsyncThunk('RemoveAdvertisement', async (id) => {

    const response = await api.post("/Worker/RemoveAdvertisement", { id })
    return response.data;

})


const AddNewWorkerAdvert = createAsyncThunk('worker', async (data) => {
    try {
        const response = await api.post("/Worker/AddAdvertisement", data)
        return response.data;
    } catch (error) {
        // Əgər FluentValidation'dan gələn error varsa, onu göstər
        if (error.response && error.response.data) {
            console.log("Validation Error:");
            console.log(error.response.data); // Burada FluentValidation error-ları olacaq
            return rejectWithValue(error.response.data);
        }

        return rejectWithValue(error.message);
    }


})

const UpdateWorkerjob = createAsyncThunk('UpdateAdvertisement', async (data) => {
    try {

        const response = await api.post("/Worker/UpdateAdvertisement", data)
        console.log("response.data");
        console.log(response.data);
        console.log("response.data");
        return response.data;
    } catch (error) {
        // Əgər FluentValidation'dan gələn error varsa, onu göstər
        if (error.response && error.response.data) {
            console.log("Validation Error:");
            console.log(error.response.data); // Burada FluentValidation error-ları olacaq
            return rejectWithValue(error.response.data);
        }

        return rejectWithValue(error.message);
    }

})


// const RegisterWorker = createAsyncThunk('Register', async (data) => {

//     const result = axios.post("http://localhost:5156/api/Worker/Register", data)
//     return result;
// })

const RegisterWorker = createAsyncThunk('Register', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5156/api/Worker/Register", data);

        console.log("response.data:");
        console.log(response.data);

        return response.data;
    } catch (error) {
        // Əgər FluentValidation'dan gələn error varsa, onu göstər
        if (error.response && error.response.data) {
            console.log("Validation Error:");
            console.log(error.response.data); // Burada FluentValidation error-ları olacaq
            return rejectWithValue(error.response.data);
        }

        return rejectWithValue(error.message);
    }
});



export {
    GetWorkerJobId, GetAllWorkerJobList, RemoveAdvertisement,
    AddNewWorkerAdvert, UpdateWorkerjob, RegisterWorker
}

