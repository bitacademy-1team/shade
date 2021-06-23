import React, { useState, useRef, useCallback } from 'react'
import ExContentsService from '../service/ExContentsService'

export default function ExContents() {
  const [query] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

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
      {list.map((title, index) => {
        if (list.length === index + 1) {
        return <div ref={lastPageElementRef} key={title}>
             <img src  = {title}></img>
        </div>
        } else {
        return <div key={title}>
            <img src  = {title}></img>
        </div>
        
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </> 
  )
}