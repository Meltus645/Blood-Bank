import API from ".";

export const create_appointment =async details => {
    const {status, message} =await API.post('/appointments/new', details);
    return {status, message};
}

export const fetch_my_appointments =async my_id =>{
    const response =await API.get(`/appointments/user-appointments/${my_id}`);
    const {status, message, data} =response;
    return {status, message, data};
}