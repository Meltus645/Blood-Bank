import API from ".";

export const fetch_appointments =async ()=>{
    const response =await API.get('/appointments');
    const {status, message, result} =response;
    return {status, message, result};
}

export const review_appointment =async (request_id, action) =>{
    const response =await API.put(`/appointments/review/${request_id}`, {status: action});
    const {status, message} =response;
    return {status, message };
}