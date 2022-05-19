import React,{useEffect,useState,Fragment} from 'react'
import { useParams } from 'react-router-dom';
import PlaceListElement from './PlaceListElement.js';
import "./PlaceList.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faCircleUser} from '@fortawesome/free-solid-svg-icons'
import AddReview from '../AddReview/AddReview.js';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom"
export default function PlaceList() {
  
  const params = useParams()
  const [reviews,setReviews] = useState([])
  const [placeData,setPlaceData] = useState([])  
  const [isModalOpen,setIsModalOpen] = useState(false)  
  const [isAuth,setIsAuth] = useState(true)

  const placeId = localStorage.getItem("placeId")
  let navigate = useNavigate()


  useEffect(()=>{
    fetch(`/reviewList/${params.placeId}`,{
      method:'GET',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(
      (result) => {
        setReviews(result.reviewById)
        setPlaceData(...result.placeById)
      },
      (error) => {
          this.setState({error})
      }
    )
  },[params.placeId,isModalOpen])

  const timesClickHandler = ()=>{
    navigate("/")
  }
  const addReviewClickHandler = () =>{
      const localAuth  = localStorage.getItem('JWT')  
      if(localAuth){
        setIsModalOpen(!isModalOpen)
        setIsAuth(true)
      }else{
        setIsAuth(false)
        setTimeout(() => {
          setIsAuth(true)
        }, 2500);
      }
  }
  const submitAddReview = () =>{

    setIsModalOpen(!isModalOpen)

  }

  return (
    <Fragment>
    <div className='place-list-container'>
      
      <div className='place-list-body'>
      
        <div className='place-info-header'>
          <div className='info-back'> 
            <p className='place-info-name'>{placeData.name}</p>
            <FontAwesomeIcon icon={faArrowLeft} size="1x" color="black" className="arrow-left" onClick={timesClickHandler}/> 
          </div>
         <span className='place-info-description'>{placeData.description}</span>
          
        </div>
        <ul className='place-info-list'>
          <li><FontAwesomeIcon icon={faCircleUser} size="lg" color="grey"/><span>{placeData.adress}</span></li>
          <li><FontAwesomeIcon icon={faCircleUser} size="lg" color="grey"/><span>{placeData.webSite}</span></li>
          <li><FontAwesomeIcon icon={faCircleUser} size="lg" color="grey"/><span>{placeData.phone}</span></li>
        </ul>
        <div className='add-review'>
          <button className='add-review-link' onClick={addReviewClickHandler}><FontAwesomeIcon icon={faCircleUser} size="sm" color="grey" className='placeholder'/> Оставить отзыв</button>  
          {!isAuth && <p className='auth-hint'>Вы не авторизованы</p>}
        </div>
        <div className='articles-list'>
          {reviews.length > 0?
          <p className='articles-list-header'>Все отзывы</p>:
          <p className='articles-list-empty'>Пока нет отзывов</p>
          }
          
          {reviews.slice(0,3).map((review)=><PlaceListElement review={review} key={review.review_id}/>)}
          {reviews.length > 3 &&
          <div className='more-reviews'>
            <Link to={`/allReviews/${placeId}`} >Ещё отзывы</Link>    
          </div>
          }
          </div>
      </div>
    </div>
    {isModalOpen && <AddReview closeModal={submitAddReview} data={{"name":placeData.name,"placeId":params.placeId,'description':placeData.description}}/>}
    </Fragment>
  )
}
