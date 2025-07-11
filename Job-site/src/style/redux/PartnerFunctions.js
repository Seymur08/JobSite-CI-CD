import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../redux/axiosInstance'
import axios, { Axios } from "axios";


const ChangePassword = createAsyncThunk('ChangePassword', async (data) => {
    const response = await api.post("/Password/ChangePassword", data)
    return response.data;
})


const GeneratorCode = createAsyncThunk('GeneratorCode', async () => {
    const response = await api.get("/Password/GeneratorCode")
    return response.data;
})


const ConFirmCode = createAsyncThunk('ConFirmCode', async (data) => {
    const response = await api.post("/Password/ConFirmCode", JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
    )
    return response.data;
})

const ForgetConFirmCode = createAsyncThunk('ConFirmCode', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Password/ConFirmCode", JSON.stringify(data),
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("TemporaryToken")}`
            }
        }
    )

    return response.data;
})




const ForgetPassword = createAsyncThunk('ForgetPassword', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Password/ForgetPassword", data)

    localStorage.setItem("TemporaryToken", response.data);
    return response.data;
})

const ForgetChange = createAsyncThunk('ForgetPassword', async (data) => {
    const response = await axios.post("http://localhost:5156/api/Password/ForgetChangePassword", data,

        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("TemporaryToken")}`
            }
        }

    )

    console.log("response")
    console.log(response.data)
    console.log("response")
    return response.data;
})




export {
    ChangePassword, GeneratorCode, ConFirmCode,
    ForgetPassword, ForgetChange,
    ForgetConFirmCode
}