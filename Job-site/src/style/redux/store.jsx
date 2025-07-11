import { configureStore } from '@reduxjs/toolkit'
// import AdminSlice from './AdminSlice.jsx'
import EmployerSlice from './EmployerSlice.Jsx'
import WorkerSlice from './WorkerSlice'
import HomeSlice from './HomeSlice'
// import adminReducer from '../redux/appslice'
// import signalRReducer from "./SignalRSlice";


export default configureStore({
    reducer: {
        // admin: AdminSlice.reducer,
        employer: EmployerSlice.reducer,
        // signalR: signalRReducer.reducer,
        worker: WorkerSlice.reducer,
        home: HomeSlice.reducer,
        // signalr: signalRReducer,

    }
})