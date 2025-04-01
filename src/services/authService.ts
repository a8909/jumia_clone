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

export const authUser = async (postData: userLogin) => {

    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(postData),
        });
        const data : userResponse = await response.json();
        return data;
    } catch (error) {
        throw new Error('no internet availble');
        
    }
    
}