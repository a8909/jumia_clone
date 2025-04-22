
import { allProduct, categoriesModel } from "../interfaces/allCategories";
import { getToken, removeAuth } from "./localStorage";

export interface userLogin{
    username : string,
    password : string
}

export interface userResponse{
    [x: string]: any;
    accessToken : string,
    email : string,
    firstName: string,
    gender : string,
    id : number,
    image : string,
    lastName : string,
    refreshToken : string,
    username : string,
}
const token = getToken();
export const authUser = async (postData: userLogin) => {

    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization" : `Bearer ${token}`
          },
          body: JSON.stringify(postData),
        });
        const data : userResponse = await response.json();
        return data;
    } catch (error) {
        throw new Error('no internet availble');
        
    }
    
}

export const getAllCategories = async() => {
    try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const data: categoriesModel[]  = await response.json();
        return data;
    } catch (error) {
        throw new Error(`${error}, check your internet connectivity`);
    }
}

export const getAllProducts = async() => {
    try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data: allProduct[] = await response.json();
        return data;
    } catch (error) {
        throw new Error(`${error}`);
    } 
}

export const singleitemProduct = async(slug: string) =>{
    try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/slug/${slug}`
        );
        const data: allProduct = await response.json();
        return data;
    } catch (error) {
        throw new Error(`${error}`);
    }
    
}

export const autoLogOut = (event: any) =>{
    if (event.type !== 'mouseClick' || event.type !== 'mouseClick') {
        removeAuth();
    }
    return;
}