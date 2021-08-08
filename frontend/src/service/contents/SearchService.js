import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchService(query, pageNumber) {
    const [list, setList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setList([])
    }, [query])

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel
        axios ({
            method: 'GET',
            url: 'http://localhost:8080/movieList',
            params: {page: pageNumber*1, size:5},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then (res => {
            setList(prevList => {
                return [...new Set([...prevList, ...res.data.map(l => l.title)])]
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
