import React,{useState,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Map from './Map/Map.js';
import Login from './Login/Login';
import mapIsClickable from '../context.js';
import { useNavigate } from "react-router-dom"

export default function Layout() {
  const [isLoginOpen,setIsLoginOpen] = useState(false)
  const [placeId,setPlaceId] = useState()
  const [currentPlaces,setCurrentPlaces] = useState([])
  const [markers,setMarkers]= useState([])
  const [isClickable,setIsClickable]= useState(false)
  const [coords,setCoords]= useState([])
  const [adress,setAdress]= useState('')
  let navigate = useNavigate()
  useEffect(()=>{
    fetch('/markersData',{
        method:'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'}
    })
    .then(res => res.json())
    .then(
        (result) => {
            let tmpMarkers = []
            result.forEach(element => {
                tmpMarkers.push(element)
            });
            setMarkers(tmpMarkers)
            setCurrentPlaces(tmpMarkers)
        },
        (error) => {
            this.setState({error})
        }
    )
},[])

const markerClick = (placeId) => {
  const clickedPlaceReview = markers.filter(place => 
    place.place_id === placeId
  )
  setCurrentPlaces(markers)
  setPlaceId(placeId)
  navigate(`/place/${clickedPlaceReview[0].place_id}`)
}

const handleLoginOpen =()=>{
} 

const setClickable =()=>{
  setIsClickable(!isClickable)
} 

const markerAdded = (point,adress) =>{
  setCoords(point)
  setAdress(adress)
}
return (

  <mapIsClickable.Provider value = {{isClickable,setIsClickable}}>
      <div onClick={handleLoginOpen}>
          <Map clickable = {isClickable} markerClick = {markerClick} markers={markers} mapClick={markerAdded}/>
          <Login onClick={(event) => event.stopPropagation()} isLoginOpen={isLoginOpen}/>
          <Outlet context={[coords,adress]}></Outlet>
      </div>
  </mapIsClickable.Provider>
)
}
