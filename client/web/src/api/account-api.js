import API from '.';

export const loginUser =async credentials =>{
    try {
        let {message, status, session} =await API.post('/users/login', credentials);
        if(session){
            const {role} =session;
            if(role.toLowerCase() !='admin'){
                status =403;
                message ="Access to web utility is forbidden. Login from app instead";
            }
        }
        return {message, status, session};
    } catch ({message}) {
        return {message};
    }
}

export const createUser =async details =>{
        const response =await API.post('/users/new', details);
        const {status, message, data} =response;
        return {status, message, data};
}

export const fetch_donors =async () =>{
    const response =await API.get('/users/donors');
    const {status, message, result} =response;
    return {status, message, result};
}

export const delete_user =async id =>{
    const response =await API.delete(`/users/remove/${id}`);
    const {status, message} =response;
    return {status, message};
}

export const update_user =async (id, details) =>{
    const {status, message, data} =await API.put(`/users/${id}`, details);
    return {status, message, data};
}

export const fetch_user =async id =>{
    const response =await API.get(`/users/${id}`);
    const {status, message, result} =response;
    return {status, message, result};
}