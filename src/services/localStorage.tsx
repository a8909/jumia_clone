
import { userResponse } from "./authService";


export const setToken =(token: string) => {
    localStorage.setItem('accessToken', token)
}

export const getToken =() => {
    return localStorage.getItem('accessToken');
}

export const authPayload = (payload : userResponse) => {
    localStorage.setItem('authPayload', JSON.stringify(payload));
}

export const getAuthPayload = () => {
  return JSON.parse(localStorage.getItem("authPayload") || "{}");
};