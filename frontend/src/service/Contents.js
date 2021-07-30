import axios from 'axios'; 
import { useEffect, useState } from 'react';
import {API_BASE_URL_,} from '../service/oauth2/OAuth';
const BOARD_API_BASE_URL = API_BASE_URL_+"/contents/"; 

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