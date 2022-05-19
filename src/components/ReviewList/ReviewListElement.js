import React from 'react'
import StarsRating from '../StarsRating/StarsRating'

import './ReviewListElement.css'

export default function ReviewListElement(props) {
  const handleShowAll = () =>{
    props.showAll(props.review.place_id)
  }

  return (
    <div className='element-container' onClick={handleShowAll}>
        <div className='review-head'>
            <p className='review-name'>{props.review.name} </p>
            <span>{props.review.adress}</span>
        </div>
        <div className='review-content'>
          <StarsRating score={Math.round(props.review.avgScore)}/>
          <span className='rate'>{props.review.avgScore}</span>
          <span className='rate-count'>{props.review.score}</span>
        </div >
    </div>
  )
}
