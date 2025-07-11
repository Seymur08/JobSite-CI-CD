import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const AllAdvertCount = createAsyncThunk('AllAdvertCount', async () => {
    const response = await api.get("/Home/AllAdvertCount")
    return response.data;
})


const GetAllPermissionWorkers = createAsyncThunk('GetAllPermissionWorkers', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Home/GetAllPermissionWorkers", data
    )

    return response.data;
})


const ForgetChangePassword = createAsyncThunk('ForgetChangePassword', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Home/ForgetChangePassword", data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("TemporaryToken")}`
            }
        }
    )

    return response.data;
})

const GetAllPermissionEmployers = createAsyncThunk('GetAllPermissionEmployers', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Home/GetAllPermissionEmployers", data)

    return response.data;
})


const GetUserAbout = createAsyncThunk('GetUserAbout', async () => {
    const response = await api.get("/Home/GetUserAbout",

    )
    return response.data;
})

const UpdateImage = createAsyncThunk('ChangeImage', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Home/ChangeImage", data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // varsa token
        },
    })
    return response.data;
})






export {

    GetAllPermissionWorkers, GetAllPermissionEmployers,
    AllAdvertCount, GetUserAbout, UpdateImage
}