import React,{useState} from 'react'
import {  faCircleH ,faThumbsUp as ThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {   faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StarsRating from '../StarsRating/StarsRating'
import './PlaceListElement.css'

export default function PlaceListElement(props) {
  const [isShowMore,setIsShowMore] = useState(false)
  const [dateSub,setDateSub] = useState('')
  const [isLiked,setIsLiked] = useState(false)
  const handleShowMore = () => {
    setIsShowMore(true)
  }

  const likeHandler = () => {
    fetch(`/addLike`,{
      method:'PATCH',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({'reviewId':props.review.review_id,'isLiked':isLiked})    
    })
    .then(res => {
      if(res.status == 200){
      }
    })

    setIsLiked(!isLiked)
  }
  

  const calculateDate = () => {
    let date =  new Date(Date.now() - Date.parse(props.review.date)).getMonth().toString()
    
    return date
  }
  const cheackMonth = (month) =>{
    let res
    month%100/10 == 1?res = "месяцев":
    month%10 == 1?res = "месяц":
    month%10 <= 4?res = "месяца":res = "Отзывов"
    
    return month + ' ' + res
  }
  return (
    <div className='review-container'>
      <div className='review-head-container'>
      <FontAwesomeIcon icon={faCircleH} size="2xl" color="Dodgerblue"/>
        <div className='review-author-name'> 
          <p>{props.review.userInfo.name}</p>
          <span>{props.review.userInfo.reviewCount} {props.review.userInfo.reviewCount%100/10 == 1?"Отзывов":
          props.review.userInfo.reviewCount%10 == 1?"Отзыв":
          props.review.userInfo.reviewCount%10 == 0?"Отзывов":
          props.review.userInfo.reviewCount%10 <= 4?"Отзыва":"Отзывов"}</span>
        </div>
      </div>
      <div className='review-body'>
        <div className='review-body-info'>
          <StarsRating score={props.review.rating}/>
          <span>{calculateDate()>0?cheackMonth(calculateDate()):'меньше месяца'} назад</span>
        </div>
        <div className='review-body-content'>
          <p>{isShowMore?props.review.review:props.review.review.slice(0,100)}
          {!isShowMore&&(props.review.review.length > 150) && <button className='more-btn' onClick={handleShowMore}>Ещё</button>}
          </p>
          
        </div>
        <div className='like-btn' onClick={likeHandler}>
          {!isLiked?<FontAwesomeIcon icon={faThumbsUp} size="lg" color="grey" />:<FontAwesomeIcon icon={ThumbsUp} size="lg" color="blue" />}
          
          <span>Нравится</span>
        </div>
        

      </div>
    </div>
  )
}
