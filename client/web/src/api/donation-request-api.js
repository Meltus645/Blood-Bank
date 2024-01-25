import API from ".";

export const fetch_donation_requests =async () =>{
    const response =await API.get('/donation-requests');
    const {status, message, result} =response;
    return {status, message, result};
}

export const review_request =async (request_id, action) =>{
    const response =await API.put(`/donation-requests/${request_id}`, {status: action});
    const {status, message} =response;
    return {status, message };
}