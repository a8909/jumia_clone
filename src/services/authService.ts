import { allProduct, categoriesModel } from "../interfaces/allCategories";
import { getToken } from "./localStorage";

export interface userLogin{
    username : string,
    password : string
}

export interface userResponse{
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
          " https://api.escuelajs.co/api/v1/categories"
        );
        const data: categoriesModel[]  = await response.json();
        return data;
    } catch (error) {
        throw new Error(`${error}, check your internet connectivity`);
    }
}

// description: "Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.";
// id: 7;
// images: (2)[
//   ("https://i.imgur.com/mp3rUty.jpeg", "https://i.imgur.com/JQRGIc2.jpeg")
// ];
// price: 79;
// slug: "classic-comfort-drawstring-joggers";
// title: "Classic Comfort Drawstring Joggers";
// updatedAt: "2025-04-01T16:36:05.000Z";

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