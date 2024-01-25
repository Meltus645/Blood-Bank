'use strict';

const API_URL ='http://localhost:5500';

class API{
    
    static async post(url, details){
        try {
            const response =await fetch(API_URL + url, {method: 'post', body: JSON.stringify(details), headers: {'Content-Type': 'application/json',}});
            const {status} =response;
            const {session, message, data} =await response.json();
            return {status, session, message, data};
        } catch ({message}) {
            return {message}
        }
    }
    
    static async get(url){
        try {
            const response =await fetch(API_URL + url);
            const {status, message} =response;
            const result =await response.json();
            return {status, message, result};
        } catch ({message}) {
            return {message}
        }
    }

    static async delete(url){
        try {
            const response =await fetch(API_URL + url, {method: 'GET'});
            const {status} =response;
            const {message} =await response.json();
            return {status, message};
        } catch ({message}) {
            return {message};
        }
    }
    
    static async put(url, details){
        try {
            const response =await fetch(API_URL + url, {method: 'PUT', body: JSON.stringify(details), headers: {'Content-Type': 'application/json'}});
            const {status} =response;
            const {message, data} =await response.json();
            return {status, message, data};
        } catch ({message}) {
            return {message};
        }
    }
}

export default API;