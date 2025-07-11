import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../redux/axiosInstance'
import { Axios } from "axios";


const ChangeStatusEmployer = createAsyncThunk('Admin/ChangeStatusEmployer', async (data) => {
    const response = await api.post("/Admin/ChangeStatusEmployer", data)
    return response.data;
})




const ChangeStatusWorker = createAsyncThunk('Admin/ChangeStatusWorker', async (data) => {
    const response = await api.post("/Admin/ChangeStatusWorker", data)
    return response.data;
})


const GetAllWaitEmployers = createAsyncThunk('Admin/GetAllEmployers', async () => {
    const response = await api.get("/Admin/GetAllEmployers")
    return response.data;
})

// const GetPermissionWorkers = createAsyncThunk('GetAllPermissionWorkers', async () => {
//     const response = await api.get("/Admin/GetAllPermissionWorkers")
//     console.log("response.data")
//     console.log(response.data)
//     console.log("response.data")
//     return response.data;
// })


const GetAllWaitWorkers = createAsyncThunk('Admin/GetAllWorkers', async () => {
    const response = await api.get("/Admin/GetAllWorkers")
    return response.data;
})


// const AllPermissionEmployers = createAsyncThunk('Admin/GetAllPermissionEmployers', async () => {
//     const response = await api.get("/Admin/GetAllPermissionEmployers")
//     return response.data;
// })


const GetAllCategoryWorker = createAsyncThunk('Admin/GetAllCategoryWorker', async () => {
    const response = await api.get("/Admin/GetAllCategoryWorker")
    return response.data;
})

const GetAllCategoryEmployer = createAsyncThunk('Admin/GetAllCategoryEmployer', async () => {
    const response = await api.get("/Admin/GetAllCategoryEmployer")
    return response.data;
})

const AddNewCategorys = createAsyncThunk('Admin/AddNewCategory', async (data) => {
    const response = await api.post("/Admin/AddNewCategory", data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
    )

    return response.data;
})

const GetAllBlokedEmployer = createAsyncThunk('Admin/AllBlokedEmployer', async () => {
    const response = await api.get("/Admin/AllBlokedEmployer")
    return response.data;
})

const GetAllBlokedWorker = createAsyncThunk('AllBlokedWorker', async () => {
    const response = await api.get("/Admin/AllBlokedWorker")
    return response.data;
})


export {
    GetAllWaitEmployers, GetAllWaitWorkers, GetAllCategoryWorker,
    ChangeStatusEmployer, ChangeStatusWorker,
    GetAllBlokedEmployer, AddNewCategorys, GetAllBlokedWorker,
    GetAllCategoryEmployer
}