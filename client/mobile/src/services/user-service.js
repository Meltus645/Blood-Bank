import API from ".";

export const loginUser =async credentials =>{
    const {status, session,  message} =await API.post('/users/login', credentials);
    return {status, session,message};
}

export const createUser =async details => {
    const {status, message} =await API.post('/users/new', details);
    return {status, message};
}
export const save_medical_record =async (userid, details) => {
    const {status, message} =await API.post(`/users/new/medical-record/${userid}`, details);
    return {status, message};
}
export const save_donation_record =async (userid, details) => {
    const {status, message} =await API.post(`/users/new/donation-record/${userid}`, details);
    return {status, message};
}

export const fetch_donors =async () => {
    const {status, message, data} =await API.get('/users/donors');
    return {status, message, data};
}
export const fetch_my_medical_records =async id => {
    const {status, message, data} =await API.get(`/users/${id}/medical_history`);
    return {status, message, data};
}
export const fetch_my_donation_records =async id => {
    const {status, message, data} =await API.get(`/users/${id}/donation_history`);
    return {status, message, data};
}