import React, { useState, useRef, useCallback } from 'react'
import ExContentsService from '../service/ExContentsService'
import { Link } from 'react-router-dom';

export default function ExContents() {
  const [query] = useState('')
  const [pageNumber, setPageNumber] = useState(0)

  const {
      list,
      hasMore,
      loading,
      error
  } = ExContentsService(query, pageNumber)
  const observer = useRef()
  const lastPageElementRef = useCallback(node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node) 
  }, [loading, hasMore])


  return (
    <>
      {list.map((l,index) => {
        if (list.length === index + 1) {
        return <div ref={lastPageElementRef} key={l.contents_id}>
             <Link to={'/movieDetail/'+l.contents_id}><img src  ={'https://images.justwatch.com'+l.poster} alt="moviePoster"/></Link>
        </div>
        } else {
        return <div key={l.contents_id}>
            <Link to={'/movieDetail/'+l.contents_id}><img src  ={'https://images.justwatch.com'+l.poster} alt="moviePoster"/></Link>
        </div>
        
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </> 
  )
}