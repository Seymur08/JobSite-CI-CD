import { StrictMode, useEffect, useState } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import store from './style/redux/store.jsx'
// import App from '../Pages/login'
// import App from '../Pages/main'
// import App from '../Pages/WorkerPage_1.jsx'
// import App from '../Pages//category'
// import App from '../Pages/search'
// import App from '../Pages/HeaderMain'
// import App from '../Pages/Admin'
// import App from '../Pages/Register'
// import App from '../Pages/AdminLogin'
// import App from '../Pages/Deneme.jsx'

// #######################################################################


// import App from '../Pages/HomePage.jsx'
// import App from '../Pages/CardWorker.jsx'
// import App from '../Pages/LoginPage.jsx'
// import App from '../Pages/RegisterPage.jsx'
// import App from '../Pages/AdminPage.jsx'
// import App from '../Pages/ChangePasswordPage.jsx'
// import App from '../Pages/WaitingPage.jsx'
// import App from '../Pages/CardEmployer.jsx'
// import App from '../Pages/WaitingEmployerPage.jsx'
// import App from '../Pages/WaitingWorkerPage.jsx'

// import App from '../Pages/ForgetPasswordPage.jsx'
// import App from '../Pages/EmployerAdvertDetails.jsx'
// import App from '../Pages/WorkerAdvertDetails.jsx'
// import App from '../Pages/AddEmployerAdvert.jsx'
// import App from '../Pages/AddWorkerAdvert.jsx'
// import App from '../Pages/Image.jsx'
// import App from '../Pages/ChatPage.jsx'
// import App from '../Pages/AddNewCategory.jsx'
// import App from '../Pages/NotFoundPage.jsx'
// import App from '../Pages/Toast.jsx'
// import App from '../Pages/WorkerMainPage.jsx'
// import App from '../Pages/Ghat.jsx'
// import App from '../Pages/ChatPage.jsx'
// import App from '../Pages/Pagination.jsx'

// import App from '../Pages/Deneme.jsx'


// ########################################################################


// import App from './App.jsx';
// // import { SignalRProvider } from  "./"  //'./style/SignalR/SignalRProvider.js'
// import { jwtDecode } from 'jwt-decode'
// import { SignalRProvider } from './style/SignalR/SignalRProvider.jsx'


// const [userId, setUserId] = useState(null);

// useEffect(() => {

//   const token = localStorage.getItem("accessToken")
//   const decoded = jwtDecode(token);
//   const userid = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
//   // const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
//   // const storedUserId = localStorage.getItem("userId");
//   if (userid) {
//     setUserId(userid);
//   }
// }, []);


// createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <SignalRProvider userId={userId}>
//         <App />
//       </SignalRProvider>
//     </BrowserRouter>
//   </Provider>
// )
// import App from '../Pages/Notification.jsx'



import App from './App.jsx';
// import App from '../Pages/Deneme.jsx'
// import App from '../Pages/WaitWorkerTable.jsx'




import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { SignalRProvider } from './style/SignalR/SignalRProvider.jsx';
import store from './style/redux/store.jsx';
// import Notification from '../Pages/Notification.jsx';
import { ChatProvider } from './ChatContext.jsx';
import NotificationPage from '../Pages/NotificationPage.jsx';
import { UserChatProvider } from '../Pages/UserChatContext.jsx';
// import store from './store'; // varsa əlavə edin

function Root() {

  // console.log(Notification.permission);

  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setToken(token);

    }
  }, [token]);


  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <SignalRProvider token={token}> */}
        {/* <SignalRProvider token={token}>
          <UserChatProvider>
            <ChatProvider> */}
        <App />
        {/* <NotificationPage /> */}
        {/* <NotificationPage /> */}
        {/* </SignalRProvider> */}
        {/* </ChatProvider>
          </UserChatProvider>
        </SignalRProvider> */}

      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

