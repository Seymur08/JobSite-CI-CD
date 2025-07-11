// components/AuthRedirector.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import isTokenValid from '../src/style/redux/ControlToken';
// import isTokenValid from '../src/style/redux/ControlToken';
function AuthRedirector() {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (accessToken && isTokenValid(accessToken)) {
            const decoded = jwtDecode(accessToken);
            const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (role === "Worker") navigate('/WorkerMainPage');
            else if (role === "Employer") navigate('/EmployerMainPage');
            else if (role === "Admin") navigate('/AdminPAge');
        }
    }, []);

    return null;
}

export default AuthRedirector;
