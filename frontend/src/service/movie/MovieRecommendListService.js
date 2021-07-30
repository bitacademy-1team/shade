import axios from 'axios'; 
import { useEffect, useState } from 'react';

const BOARD_API_BASE_URL = "http://localhost:8000/cu/"; 

export default function MovieRecommendListService(){

    const [ loading , setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list,setList] = useState([]);

    useEffect(() =>{
        setList([])
    },[])

    useEffect(() =>{
        setLoading(true)
        let cancel
        axios({
            method : 'GET',
            url: BOARD_API_BASE_URL,
            params: {id : 104},
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            console.log(res)
            console.log(JSON.stringify(res.data))
            console.log(Object.keys(res.data).length)
            setList(res.data)
            console.log("길이"+res.data.length)
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return setError(true)
        })
        return () => cancel()
    },[])

    return {loading,error,list}
}
