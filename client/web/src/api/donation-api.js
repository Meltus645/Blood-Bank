import API from ".";

export const add_donation =async values =>{
    const response =await API.post('/donations/new', values);
    const {status, message, data} =response;
    return {status, message, data};
}

export const fetch_donations =async () =>{
    const response =await API.get('/donations');
    const {status, message, result} =response;
    return {status, message, result};
}