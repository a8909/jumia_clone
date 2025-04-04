
import { useState } from "react";
import { userResponse } from "./authService";

const currentToken = false;


export const setToken =(token: string) => {
    localStorage.setItem('accessToken', token)
}

export const getToken =() => {
    return localStorage.getItem('accessToken');
}

// export const isuserLoggedin =()=>{
//     if(getToken()) return !!currentToken;
// }

export const authPayload = (payload : userResponse) => {
    localStorage.setItem('authPayload', JSON.stringify(payload));
}

export const getAuthPayload = () => {
  return JSON.parse(localStorage.getItem("authPayload") || "{}");
};

export const removeAuth = () =>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authPayload');
}