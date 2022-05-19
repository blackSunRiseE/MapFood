import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ReviewListElement from './ReviewListElement'
import './ReviewList.css'
import Search from '../SearchForm/SearchForm';

export default function ReviewList(props) {
  const [isHideList,setIsHideList] = useState(true)
  const placeId = localStorage.getItem("placeId")
  const [places,setPlaces] = useState([])  
  const [searchResult,setSearchResult] = useState([])
  const [curentPlaces,setCurentPlaces] = useState([]) 
  const [isAuth,setIsAuth] = useState(!!localStorage.getItem('JWT'))
  const [isHintOpen,setIsHintOpen] = useState(false)
  let navigate = useNavigate()

  useEffect(()=>{
    
    const clickedPlaceReview = places.filter(place => 
      place.place_id == placeId
    )
    setCurentPlaces(clickedPlaceReview)
    
  },[placeId])

  useEffect(()=>{
    fetch('/placeList',{
      method:'GET',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(
      (result) => {
        setPlaces(result)
        setCurentPlaces(result)
      },
      (error) => {
          this.setState({error})
      }
    )
  },[])

  const showAllReviews = (placeId)=>{
    localStorage.setItem("placeId",placeId)
    navigate(`/place/${placeId}`)
    
  }

  const changeSearch = (text) => {
    const pl = places.filter(place => place.name.toLowerCase().indexOf(text.toLowerCase())!=-1)
    setSearchResult(pl)
  }
  const submitSearch = (text) => {
   if(searchResult.length > 0)
      setCurentPlaces(searchResult)
    else{
      setCurentPlaces(places)
    }
  }

  const submitClear = () => {
    setCurentPlaces(places)
  }

  const handleAddPlaceLink = () => {
    const localAuth  = localStorage.getItem('JWT')  
      if(localAuth){
        setIsAuth(true)
      }else{
        setIsHintOpen(true)
        setIsAuth(false)
        setTimeout(() => {
          setIsHintOpen(false)
        }, 2500);
      }
    
  }

  return (
    <div className='review-list-container'>
      <div className='review-list-header'>
        <Search className="search-container" changeSearch={changeSearch} submitSearch={submitSearch} matchList={searchResult} submitClear={submitClear}></Search>
      </div>
      <div className={`review-list-body ${isHideList?"hide":""}`}>
        <Link to={isAuth?'/addPlace':'#'}className='add-place-link' onClick={handleAddPlaceLink}> 
          <FontAwesomeIcon icon={faLocationPin} size="1x" color="black" className="glass"/> 
          <span>Добавить точку</span>
        </Link>
        {isHintOpen && <p className='auth-hint-place'>Вы не авторизованы</p>}
        {curentPlaces.map((place)=><ReviewListElement review={place} showAll={showAllReviews} key={place.place_id}/>)}
      </div>
    </div>
  )
}
