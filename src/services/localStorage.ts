

import { userResponse } from "./authService";


export const setToken =(token: string) => {
    localStorage.setItem('accessToken', token);
}

export const setValue =(sessionKey: string, sessionValue: string) => {
    sessionStorage.setItem(sessionKey, sessionValue);
}

export const getValue =(sessionKey: string) => {
    return sessionStorage.getItem(sessionKey) || '';
}

export const getToken =() => {
    return localStorage.getItem('accessToken');
}

export const productValue =(itemKey: string, itemValue: string)=>{
    localStorage.setItem(itemKey, itemValue);
}
export const getProductValue =(itemValue: string)=>{
    return JSON.parse(localStorage.getItem(itemValue) || '[]');
}

export const authPayload = (payload : userResponse) => {
    localStorage.setItem('authPayload', JSON.stringify(payload));
}

export const getAuthPayload = () => {
  return JSON.parse(localStorage.getItem("authPayload") || "{}");
}

export const removeAuth = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authPayload');
}