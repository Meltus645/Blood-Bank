import API from ".";

export const fetch_centers =async () =>{
    const response =await API.get('/centers');
    const {status, message, data} =response;
    return {status, message, data};
}