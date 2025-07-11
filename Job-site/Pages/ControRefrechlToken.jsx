import axios from "axios";

export async function refreshControl() {

    let accessToken = localStorage.getItem("Token");
    let refreshToken = localStorage.getItem("RefreshToken");

    try {

        let res = await axios.post("http://localhost:5156/api/Auth/RefrechToken", {
            accessToken, refreshToken
        });

        if (res.status === 200) {
            {
                console.log("Status 200: Token uğurla yeniləndi");
                localStorage.setItem("Token", res.data.token)
                localStorage.setItem("RefreshToken", res.data.refreshToken)
            }
            return true;
        } else {
            console.log("Server başqa status qaytardı: ", res.status);
            return false;
        }

    } catch (error) {
        console.error(" Token yenilənərkən xəta baş verdi:", error.response?.status, error.message);
        return false;
    }
}