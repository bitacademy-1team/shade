import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN } from '../oauth2/OAuth';


const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

const getCurrentUser = () => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return request({
        url: API_BASE_URL + "/api/user/google",
        method: 'GET'
    });
}

const login = (username, password) => {
    return axios.post(API_BASE_URL + "/api/auth/login", {
        username,
        password,
    })
    .then((response) => {
        // alert(JSON.stringify(response.data.accessToken))
        if(response.data.accessToken){
            localStorage.setItem(ACCESS_TOKEN,response.data.accessToken);
        }
        return response.data;
    });
}; 


const join = (username, email, password, nickname, birthday, gender) => {
    return axios.post(API_BASE_URL + "/api/auth/join", {
        username,
        email,
        password,
        nickname,
        birthday,
        gender
    })
};

const checkUsername = (username) => {
    return axios.get(API_BASE_URL + "/api/auth/check/" + username,{
        username,
    })
}

const updateUser = (username, email, password, nickname) => {
    return axios.put(API_BASE_URL + "/api/auth/user" , {
        username,
        email,
        password,
        nickname
    })
}

const findId = (email) => {
    return axios.get(API_BASE_URL + "/api/auth/findId/" + email,{
        email,
    })
}
const findPw = (username, email) => {
    return axios.post(API_BASE_URL + "/api/auth/findPw",{
        username,
        email,
    })
}
const findPwCheck = (username, email) => {
    return axios.get(API_BASE_URL + "/api/auth/findPw/" + username + "/" + email,{
        username,
        email,
    })
}

export const getPublicContent = () => {
    return axios.get(API_BASE_URL + "/api/user/all");
};
export const getUserBoard = () => {
    return request({
        url: API_BASE_URL + "/api/user/user",
        method: 'GET'
    });
};

// export const getUserBoard = () => {
//     return axios.get(API_BASE_URL + "/api/user/user", {headers : authHeader } );
// };
export const getAdminBoard = () => {
    return axios.get(API_BASE_URL + "/api/user/admin", {headers : request() });
};


export default {
    getCurrentUser,
    login,
    join,
    checkUsername,
    getUserBoard,
    updateUser,
    findId,
    findPw,
    findPwCheck,
}