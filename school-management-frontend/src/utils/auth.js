import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = "token"

export function isAuthenticated() {
    // Implement your authentication logic here
    const token = getToken();

    if (!token) return false

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            logout()
            return false;
        }

        return decoded;
    } catch (err) {
        console.error('Invalid token:', err);
        logout();
        return false;    
    }
}

export function setToken(token) {
    // implement your logic to set the token
    localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function logout() {
    // implement your logic to remove the token
    localStorage.removeItem(TOKEN_KEY)
}