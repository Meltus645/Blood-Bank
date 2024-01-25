import API from ".";

export const fetch_my_notifications =async myID =>{
    const response =await API.get(`/notifications/user-notifications/${myID}`);
    const {status, message, data} =response;
    return {status, message, data};
}

export const read_notification =async id =>{
    const response =await API.get(`/notifications/read/${id}`);
    const {status} =response;
    return {status};
}