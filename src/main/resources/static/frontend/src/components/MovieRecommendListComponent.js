import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom';
import MovieRecommendListService from '../service/MovieRecommendListService';

export default function MovieRecommendListComponent() {

  const {
      list,
      loading,
      error
  } = MovieRecommendListService()


  return (
    <>
      {list.map((l,index) => {
        return <div key={l.contents_id}>
            <img src  ={'https://images.justwatch.com'+l.poster} alt="moviePoster"/>
        </div>
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error...'}</div>
    </> 
  )
}