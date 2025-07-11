import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./axiosInstance";

// const GetWorkerJobId = createAsyncThunk('worker', async (id) => {
//     // const accessToken = localStorage.getItem("accessToken");
//     console.log("lllllllllllllllllllllllll")
//     console.log("lllllllllllllllllllllllll")
//     console.log(id)
//     console.log("lllllllllllllllllllllllll")
//     console.log("lllllllllllllllllllllllll")

//     const response = await api.post("http://localhost:5156/api/Worker/GetAdvertWorkerById", { id })
//     console.log("Worker varrrrrrdaaaa")
//     console.log(response.data)
//     console.log("Worker varrrrrrdaaaa")
//     console.log(id)
//     return response.data;
// })


const GetAllEmployerJobList = createAsyncThunk('employer', async () => {
    const response = await api.get("http://localhost:5156/api/Employer/GetAllAdvertisement")

    return response.data;
})

const RemoveAdvertisementEmp = createAsyncThunk('employer', async (id) => {
    console.log("fkjvndfkvjrvjrvrjvrvjr")
    console.log("fkjvndfkvjrvjrvrjvrvjr")
    console.log("fkjvndfkvjrvjrvrjvrvjr")
    console.log("fkjvndfkvjrvjrvrjvrvjr")
    console.log("fkjvndfkvjrvjrvrjvrvjr")
    console.log(id)
    const response = await api.post("/Employer/RemoveAdvertisement", { id })

    return response.data;
})


const UpdateEmployerJob = createAsyncThunk('employer', async (data, { rejectWithValue }) => {


    try {
        const response = await api.post("/Employer/UpdateAdvertisement", data)

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
})



// const RegisterEmployer = createAsyncThunk('Register', async (data, { rejectWithValue }) => {
//     try {
//         const response = axios.post("http://localhost:5156/api/Employer/Register", data)

//         console.log("response.data:");
//         console.log(response.data);

//         return response.data;
//     } catch (error) {
//         // Əgər FluentValidation'dan gələn error varsa, onu göstər
//         if (error.response && error.response.data) {
//             console.log("Validation Error:");
//             console.log(error.response.data); // Burada FluentValidation error-ları olacaq
//             return rejectWithValue(error.response.data);
//         }

//         return rejectWithValue(error.message);
//     }
// });

const RegisterEmployer = createAsyncThunk('Register', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:5156/api/Employer/Register", data);

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




const AddNewAdvert = createAsyncThunk('AddAdvertisement', async (data, { rejectWithValue }) => {

    try {
        // const result = axios.post("http://localhost:5156/api/Employer/Register", data)
        const response = await api.post("/Employer/AddAdvertisement", data)

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
})



export { GetAllEmployerJobList, RemoveAdvertisementEmp, UpdateEmployerJob, RegisterEmployer, AddNewAdvert }