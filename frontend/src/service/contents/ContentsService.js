import { useState, useEffect } from "react";
import axios from "axios";

export default function ContentsService(query, pageNumber) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    
    useEffect(() => {
        setList([])
    }, [query])
    
    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'http://localhost:8080/movieList',
            params: {page: pageNumber*20,size:20},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setList(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l)])]   //  title -> poster
            }) 
            setHasMore(res.data.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber])
    return { loading, error, list, hasMore }
}