import React,{useEffect,useState,Fragment} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import PlaceListElement from '../PlaceList/PlaceListElement';
import { faCircleUser ,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddReview from '../AddReview/AddReview';
import RatingStat from '../RatingStat/RatingStat';
import Search from '../Search/Search';

import './AllReviews.css'

export default function AllReviews() {
    const params = useParams()
    let navigate = useNavigate()
    const [reviews,setReviews] = useState([])
    const [rating,setRating] = useState([])
    
    const [placeData,setPlaceData] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)  
    const [searchValue,setSearchValue] = useState('')
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
            setRating(result.reviewById.map(review=>review.rating))
          },
          (error) => {
              this.setState({error})
          }
        )
      },[])
      
      const addReviewClickHandler = () =>{
          setIsModalOpen(!isModalOpen)
      }

      const sortOrder = (sortFunction) =>{
        setReviews(reviews.sort(sortFunction).map(el=>el))
      }
      const searchString =(value)=>{
        setSearchValue(value)
      }
      const handleGoBack =(value)=>{
        navigate(`/place/${params.placeId}`)
      }
      
    return (
    <Fragment>
      <div className='all-reviews-container'>
          <div className='all-reviews-header'>
              <FontAwesomeIcon icon={faArrowLeft} size="1rem" color="black" className='back-arrow' onClick={handleGoBack}/>
              <p>Все отзывы</p>
          </div>
          <div className='all-reviews-body'>
              <div className='rating-header'>
                  <RatingStat score={rating}/>
              </div>
              <div className='add-review'>
                <button className='add-review-link' onClick={addReviewClickHandler}><FontAwesomeIcon icon={faCircleUser} size="sm" color="grey" className='placeholder'/> Оставить отзыв</button>  
              </div>
              <div>
                <Search sortOrder={sortOrder} searchString={searchString}/>
                </div> 
              {reviews.map((review)=>{
                if(review.review.includes(searchValue))
                  return <PlaceListElement review={review} key={review.review_id}/>
              })}
          </div>
      </div>
      {isModalOpen && <AddReview closeModal={addReviewClickHandler} data={{"name":placeData.name,"userName":"pogonyalo","placeId":params.placeId}}/>}
              
    </Fragment>
  )
}
