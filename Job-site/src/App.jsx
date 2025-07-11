
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useLocation, useNavigate, Outlet } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Pages/Header.jsx';
// import Categories from '../Pages/category.jsx';
import Search from '../Pages/search.jsx';

import { Link } from "react-router-dom";
import HeaderMain from '../Pages/HeaderMain.jsx';
import Register from '../Pages/login.jsx';
import Admin from '../Pages/Admin.jsx';
import AdminLogin from '../Pages/AdminLogin.jsx';
import Worker from '../Pages/WorkerPage_1.jsx';
import { refreshControl } from '../Pages/ControRefrechlToken.jsx';
// import HomePage from '../Pages/HomePage.jsx';
import CardEmployer from '../Pages/CardEmployer.jsx';
import CardWorker from '../Pages/CardWorker.jsx';
import WaitingEmployerPage from '../Pages/WaitingEmployerPage.jsx';
import WaitingWorkerPage from '../Pages/WaitingWorkerPage.jsx';
import LoginPage from '../Pages/LoginPage.jsx';
import RegisterPage from '../Pages/RegisterPage.jsx';
import AdminPage from '../Pages/AdminPage.jsx';
import ChangePasswordPage from '../Pages/ChangePasswordPage.jsx';
import WaitingPage from '../Pages/WaitingPage.jsx';
import ForgetPasswordPage from '../Pages/ForgetPasswordPage.jsx';
import EmployerAdvertDetails from '../Pages/EmployerAdvertDetails.jsx';
import AddEmployerAdvert from '../Pages/AddEmployerAdvert.jsx';
import HomePage from '../Pages/HomePage.jsx';
// import LoginPage from '../Pages/LoginPage.jsx';
import FooterPage from '../Pages/FooterPage.jsx';
import Image from '../Pages/Image.jsx';
import AddNewCategory from '../Pages/AddNewCategory.jsx';
import NotFoundPage from '../Pages/NotFoundPage.jsx';
import AddWorkerAdvert from '../Pages/AddWorkerAdvert.jsx';
import WorkerAdvertDetails from '../Pages/WorkerAdvertDetails.jsx';
import BlockedAdvertPage from '../Pages/BlockedAdvertPage.jsx';
import WorkerMainPage from '../Pages/WorkerMainPage.jsx';
import EmployerMainPage from '../Pages/EmployerMainPage.jsx';
import EditWorkerPage from '../Pages/EditWorkerPage.jsx';
import EditEmployerPage from '../Pages/EditEmployerPage.jsx';
import ChatPage from '../Pages/ChatPage.jsx';
import ForgetChangePassword from '../Pages/ForgetChangePassword.jsx';
import { Pagination } from 'swiper/modules';
import { useSignalR, SignalRProvider } from './style/SignalR/SignalRProvider.jsx';
// import requestNotificationPermission from '../Pages/Notification.jsx';
// import { SignalRProvider, useSignalR } from './style/redux/SignalRContext.js';
// import { SignalRProvider, useSignalR } from './style/redux/SignalRContext';
// import HomePage from '../Pages/HomePage.jsx';
import * as signalR from "@microsoft/signalr";
import { ChatProvider, useChat } from './ChatContext.jsx';
import NotificationPage from '../Pages/NotificationPage.jsx';
import { UserChatProvider } from '../Pages/UserChatContext.jsx';
import AuthRedirector from '../Pages/AuthRedirector.jsx';
import Deneme from '../Pages/Deneme.jsx';
import WorkerDashboard from '../Pages/WorkerDashboard.jsx';
import EmployerDashboard from '../Pages/EmployerDashboard.jsx';
import AdminDashboard from '../Pages/AdminDashboard.jsx';
import WaitEmployerTable from '../Pages/WaitEmployerTable.jsx';
import WaitWorkerTable from '../Pages/WaitWorkerTable.jsx';


function App() {

  const [showModal, setShowModal] = useState(true); // true

  const connection = useSignalR();

  const [isAdminLogin, setAdminLoginPanel] = useState(false); //    true olsa ekrana cixmayacak
  const [ok, setOk] = useState(false);  // true

  const location = useLocation();
  const navigate = useNavigate();

  // const isHomePage = location.pathname === "/";
  // const isAdminPage = location.pathname === "/Admin";

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(false);
    setShowModal(false);
    navigate("/Admin");
  };

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setToken(token);

    }
  }, [token]);


  // Modal üçün arxa plan location-u saxla (navigate-də bunu veririk)
  // const state = location.state && location.state.background;
  const state = location.state?.background || null;
  // const localBackground = localStorage.getItem("backgroundPath");
  // const state = location.state?.background || (localBackground ? { pathname: localBackground } : null);




  ////////////////////////////////////////////////////////////////////////////////

  const connectionRef = useRef(null);

  return (
    <>
      <header>
        <HomePage />
        {/* <AuthRedirector /> */}
      </header>

      <main>
        <SignalRProvider token={token}>
          <UserChatProvider>
            <ChatProvider>
              {/* location={state || location} */}
              <Routes location={state || location}>

                <Route path="/" element={<Image />} />
                <Route path="/HomePage" element={<Image />} />
                <Route path="/AdminPage" element={<AdminPage />} />


                <Route path="/WorkerDashboard" element={<WorkerDashboard />}>
                  <Route index element={<WorkerMainPage />} />
                  <Route path="WorkerMainPage" element={<WorkerMainPage />} />
                  <Route path="AddWorkerAdvert" element={<AddWorkerAdvert />} />
                  <Route path="ChangePasswordPage" element={<ChangePasswordPage />} />
                  <Route path="EditWorkerPage/:id" element={<EditWorkerPage />} />
                </Route>

                <Route path="/EmployerDashboard" element={<EmployerDashboard />} >
                  <Route index element={<EmployerMainPage />} />
                  <Route path="EmployerMainPage" element={<EmployerMainPage />} />
                  <Route path="ChangePasswordPage" element={<ChangePasswordPage />} />
                  <Route path="AddEmployerAdvert" element={<AddEmployerAdvert />} />
                  <Route path="EditEmployerPage/:id" element={<EditEmployerPage />} />
                </Route>

                <Route path="/AdminDashboard" element={<AdminDashboard />}>

                  <Route index element={<AdminPage />} />
                  <Route path="AddNewCategory" element={<AddNewCategory />} />
                  <Route path="ChangePasswordPage" element={<ChangePasswordPage />} />
                  <Route path="WaitingEmployerPage/:id" element={<WaitingEmployerPage />} />
                  <Route path="WaitEmployerTable" element={<WaitEmployerTable />} />
                  <Route path="WaitingWorkerPage/:id" element={<WaitingWorkerPage />} />
                  <Route path="WaitWorkerTable" element={<WaitWorkerTable />} />
                  <Route path="BlockedAdvertPage" element={<BlockedAdvertPage />} />
                  <Route path="WaitingPage" element={<WaitingPage />} />

                </Route>

                <Route path="/CardWorker" element={<CardWorker />} />
                <Route path="/cardEmployer" element={<CardEmployer />} />
                <Route path="/LoginPage" element={<LoginPage setToken={setToken} />} />
                <Route path="/RegisterPage" element={<RegisterPage />} />
                <Route path="/ForgetPasswordPage" element={<ForgetPasswordPage />} />
                <Route path="/ForgetChangePassword" element={<ForgetChangePassword />} />
                <Route path="/EmployerAdvertDetails/:id" element={<EmployerAdvertDetails />} />
                <Route path="/WorkerAdvertDetails/:id" element={<WorkerAdvertDetails />} />
                <Route path="/Pagination" element={<Pagination />} />

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              {state && (
                <Routes>

                  <Route path="/ChatPage" element={<ChatPage />} />
                </Routes>
              )}
            </ChatProvider>
          </UserChatProvider>
        </SignalRProvider>
      </main >

      <footer>
        <FooterPage />
      </footer>
    </>
  );
}

export default App;