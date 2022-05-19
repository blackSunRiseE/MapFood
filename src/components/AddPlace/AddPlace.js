import React,{useEffect,useState} from 'react'
import './AddPlace.css'
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useContext } from 'react'
import mapIsClickable from '../../context'

export default function () {
  const [coords,adress] = useOutletContext()
  const [placeName,setPlaceName] = useState("")
  const [description,setDescription] = useState("")
  const [webName,setWebName] = useState("")
  const [phone,setPhone] = useState("")
  const { isClickable, setIsClickable } = useContext(mapIsClickable);
  useEffect(()=>{
    setIsClickable(true)
  }
  ,[])
  const navigate = useNavigate()

  const handleGoBack = () =>{
    setIsClickable(false)
    navigate('/')
  } 

  const handleSubmit = (event) =>{
    event.preventDefault()
    if(placeName && description && webName && phone && coords){
      fetch('/addPlace',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'},          
        body: JSON.stringify({placeName,description,"coords":coords,phone,webName,adress})
      }).then((response,reject)=>{
        if(response.status == 200){
        }
      })
    
      setIsClickable(false)
      navigate('/')
    }
  }

  const handleChangeName = (event) =>{
    setPlaceName(event.target.value)
  } 

  const handleChangeDescription = (event) =>{
    setDescription(event.target.value)
  } 

  const handleChangeWeb = (event) =>{
    setWebName(event.target.value)
  } 

  const handleChangePhone = (event) =>{
    setPhone(event.target.value)
  } 
  
  return (
    <div className='add-place-container'>
      <div className='add-place-header'>
        <FontAwesomeIcon icon={faArrowLeft} size="1rem" color="black" className='back-arrow' onClick={handleGoBack}/>
        <p>Добавить точку</p>
      </div>
      <form className='add-form' onSubmit={handleSubmit}>
        
        <label>
          Название
          <input type='text' value={placeName} onChange={handleChangeName} className={!placeName?'red-outline':'blue-outline'}></input>
        </label>
        <label>
          Описание
          <input type='text' value={description} onChange={handleChangeDescription} className={!description?'red-outline':'blue-outline'}></input>
        </label>
        <label>
          Сайт
          <input type='text' value={webName} onChange={handleChangeWeb} className={!webName?'red-outline':'blue-outline'}></input>
        </label><label>
          Телефон
          <input type='text' value={phone} onChange={handleChangePhone} className={!phone?'red-outline':'blue-outline'}></input>
        </label>
        <label>
          Адрес
          <p>{adress}</p>
          {!adress && <p>Тыкните на карту</p>}
        </label>
        <button type='submit' className='add-place-submit'>Добавить</button>
      </form>
    </div>
  )
}
