import axios from 'axios'; 
import { useEffect, useState } from 'react';

const BOARD_API_BASE_URL = "http://localhost:8080/movieRecommend"; 

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
            cancelToken: new axios.CancelToken(c => cancel =c)
        }).then(res => {
            setList(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l)])]
            })
            setLoading(false)
        }).catch(e => {
            if(axios.isCancel(e)) return setError(true)
        })
        return () => cancel()
    },[])

    return {loading,error,list}
}
