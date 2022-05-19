import React, { useState} from 'react'
import './AddReview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleH } from '@fortawesome/free-solid-svg-icons'
import StarsRatingClickable from '../StarsRating/StarsRatingClickable'
import ConfirmButton from '../Buttons/ConfirmButton'

export default  function AddReview(props){

  const [isClose,setIsClose] = useState(false)
  const [reviewValue,setReviewValue] = useState("")
  const [starsValue,setStarsValue] = useState(0)

  const handleSubmitForm = ()=>{
    var date = new Date();
    fetch('/addReview',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('JWT')},          
      body: JSON.stringify({reviewValue,starsValue,"placeId":props.data.placeId,"date":date,'user':localStorage.getItem('user')})
    }).then((response,reject)=>{
      if(response.status === 200){
        props.closeModal(true)
      }
    })
  }

  const onAccept = () => {
    setIsClose(false)
    props.closeModal()
  }

  const onDecline = () => {
    setIsClose(false)
  }

  const onDownCloseHandle = () => {
    if(reviewValue === ""){
      props.closeModal()
    }
    setIsClose(true);
    //props.closeModal()
  }
  const handleKeyDown =(e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight-120}px`; 
  }

  const handleTextareaChange = (event)=>{
    setReviewValue(event.target.value)
  }
  const starsRatingChange = (index)=>{
    setStarsValue(index)
  }
 
  return (
    <div className='add-review-modal-container' onMouseDown={onDownCloseHandle}>
      <div className='add-review-modal' onMouseDown={(event) => event.stopPropagation()}>
        <p className='place-add-name'>{props.data.name}</p>
        {isClose && 
        <div className='close-danger'>
          <span >Удалить отзыв?</span>
          <div className='confirm-btns'>
            <ConfirmButton value={"Hет"} clickHandler={onDecline}/>
            <ConfirmButton value={"Да"} clickHandler={onAccept}/>
          </div>
        </div>
        
        }
        {isClose && <div className='blur'></div>}
        <div className='add-review-header'>
          <div className='user-name'>
            <FontAwesomeIcon icon={faCircleH} size="2x" color="grey" className='user-icon'/>
            <div className='user-info'>
              <p>{localStorage.getItem('user')}</p>
              <span>{props.data.description} </span>
            </div>  
          </div>
          <StarsRatingClickable starsValue={starsRatingChange}></StarsRatingClickable>
          <textarea placeholder='Оставьте отзыв' className='review-text' onKeyDown={handleKeyDown} value={reviewValue} onChange={handleTextareaChange}></textarea>
        </div>
        <div className='add-review-buttons'>
            <button className='review-btn-cancel' onMouseDown={onDownCloseHandle}>Отмена</button>
            <button className='review-btn-add' onClick={handleSubmitForm}>Добавить</button>
        </div>
      </div>
    </div>

  )
  
}
