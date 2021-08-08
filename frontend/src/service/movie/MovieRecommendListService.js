import axios from 'axios'; 
import { useEffect, useState } from 'react';
import { API_BASE_URL_,ACCESS_TOKEN,ID } from './oauth2/OAuth';

const BOARD_API_BASE_URL = API_BASE_URL_+"/cu/"; 

export default function MovieRecommendListService(){

    const [ loading , setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list,setList] = useState([]);
    const [msg,setMsg] = useState('');
    // useEffect(() =>{
    //     setList([])
    // },[])

    useEffect(() =>{
        console.log(localStorage.getItem(ACCESS_TOKEN))
        setLoading(true)
        let cancel
        axios({
            method : 'GET',
            url: BOARD_API_BASE_URL,
            params: {id : localStorage.getItem(ID)},
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            console.log(res)
            console.log(JSON.stringify(res.data))
            console.log(Object.keys(res.data).length)
            if(res.data === "데이터가 부족합니다!"){
                setMsg(res.data)
            }else{
                setList(res.data)
            }
            console.log("길이"+res.data.length)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return setError(true)
        })
        return () => cancel()
    },[])

    return {loading,error,list,msg}
}
