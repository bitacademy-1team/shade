import axios from "axios";
import { useState } from "react";
import { ACCESS_TOKEN, API_BASE_URL } from "../oauth2/OAuth";

const token = localStorage.getItem(ACCESS_TOKEN)

const createReview = (contents_id,comment) =>{
    let result;
    axios({
        method : 'GET',
        url : API_BASE_URL + '/review/create',
        params : {contents_id : contents_id, comment : comment},
        headers : {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data
    })
    return result;
}

const modifyReview = (review_id,comment) =>{
    let result;
    axios({
        method : 'post',
        url : API_BASE_URL + '/review/modify',
        params : {review_id : review_id, comment : comment},
        headers : {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data
    })
    return result;
}

const deleteReview = (review_id) =>{
    let result;
    axios({
        method : 'GET',
        url : API_BASE_URL + '/review/delete',
        params : {review_id : review_id},
        headers : {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        result = res.data
    })
    return result;
}



export default{
    createReview,
    modifyReview,
    deleteReview,
    
}
