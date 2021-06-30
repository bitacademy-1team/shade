import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import MovieDetailService from '../service/MovieDetailService';

export default function MovieDetailComponent() {

    const {contents_id} = useParams()
    const[movieDetail,setMovieDetail] = useState({})

    useEffect(() => {
        MovieDetailService.getMovieDetail(contents_id).then( res =>{
            setMovieDetail(res.data)
        })
    },[])

    return (
        <>
            <div>
                <p>{movieDetail.genre_names}</p>
            </div>
        </>
    )
}