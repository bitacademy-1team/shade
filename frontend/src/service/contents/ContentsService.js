import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN } from '../service/oauth2/OAuth';

export default function ExContentsService(query, pageNumber, object_type, platform_ids, state4) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [platform_idss,setPlatform_idss] =useState(platform_ids)
    const [state,setState] = useState(1)
    useEffect(() => {
        setList([])
        setPlatform_idss(platform_ids)
        setState(state4)
    }, [query, platform_ids, state4])
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        let token
        if(localStorage.getItem(ACCESS_TOKEN)) {
            token =localStorage.getItem(ACCESS_TOKEN);
        }
        axios({
            method: 'GET',
            url: API_BASE_URL+'/movieList',
            params: {page: pageNumber*20,size:20,object_type:object_type,platform_ids:platform_ids},
            headers: {
                'Authorization': 'Bearer '+token,
                'Content-Type': 'application/json'
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            
            setList(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l)])]
            }) 
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber, object_type, platform_idss, platform_ids,state])
    return { loading, error, list, hasMore}
}
