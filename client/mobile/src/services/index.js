'use strict';

// const API_URL ='http://192.168.74.108:5500';
const API_URL ='http://192.168.100.162:5500';
// const API_URL ='http://192.168.134.174:5500';

class API{
    
    static async post(url, data){
        try {
            const response =await fetch(`${API_URL}${url}`, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}});
            const {status} =response;
            const {session, message} =await response.json();
            return {status, session, message};
        } catch ({message}) {
            return {message}
        }
    }
    static async get(url){
        try {
            const response =await fetch(`${API_URL}${url}`);
            const {status} =response;
            const data =await response.json();
            return {status, data};
        } catch ({message}) {
            return {message}
        }
    }
}

export default API;