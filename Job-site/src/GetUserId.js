// export const GetUserId = () => {
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//         userId = Math.random().toString(36).substr(2, 9); // Random ID
//         localStorage.setItem("userId", userId);
//     }
//     return userId;
// };

import { jwtDecode } from "jwt-decode";

// export const userId = GetUserId();
const GetUserId = () => {
    const token = localStorage.getItem("accessToken")
    const decoded = jwtDecode(token)
    const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

    //let userId = localStorage.getItem("userId");
    if (!id) {
        userId = Math.random().toString(36).substr(2, 9); // Random ID
        localStorage.setItem("userId", userId);
    }
    return id;
};

export default GetUserId; // Default export
