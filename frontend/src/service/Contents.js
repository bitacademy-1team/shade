import axios from 'axios'; 
import { useEffect, useState } from 'react';

const BOARD_API_BASE_URL = "http://127.0.0.1:8000/contents/"; 

export default function ContentsService(){
    const [list,setList] = useState([]);
    
    useEffect(() =>{
        setList([])
    },[])
    
    useEffect(() =>{
        axios({
            method : 'GET',
            url: BOARD_API_BASE_URL
        }).then(res => {
            setList(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l)])]
            })
        }).catch(e => {

        })
        
    },[])
    
    return {list}
}