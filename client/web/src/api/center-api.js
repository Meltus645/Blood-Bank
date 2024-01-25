import API from ".";

export const add_center =async values =>{
    const response =await API.post('/centers/new', values);
    const {status, message, data} =response;
    return {status, message, data};
}

export const fetch_centers =async (id =null) =>{
    const response =await API.get(`/centers${id? '/'+id: ''}`);
    const {status, message, result} =response;
    return {status, message, result};
}

export const update_center =async (id, details) =>{
    const {status, message, data} =await API.put(`/centers/${id}`, details);
    return {status, message, data};
}

export const delete_center =async id =>{
    const response =await API.delete(`/centers/remove/${id}`);
    const {status, message} =response;
    return {status, message};
}