export default function isTokenValid(token) {
    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000); // indiki vaxt saniyə ilə

    return (payload.exp - 10) > currentTime;
}