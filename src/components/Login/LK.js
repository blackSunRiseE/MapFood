import React,{useEffect, useState} from 'react'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LK.css'

export default function LK(props) {
  const [userData,setUserData] = useState({})

  useEffect(()=>{
    fetch('/userData',{
      method:'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({'userId':localStorage.getItem('userId')})
    }).then(response=> response.json()
    )
    .then(result=>{
        setUserData(result)
    })

  },[])

  const handleExit = () =>{
    localStorage.setItem('JWT','')
    localStorage.setItem('user','')
    localStorage.setItem('userId','')
    props.isAuth()
  }

  return (
    <div className='login-menu-container'>
      <FontAwesomeIcon icon={faCircleUser} size="5x" color="gray"/>
      <ul className='login-menu'>
        <li>
          <p className='list-name'>Имя</p>
          <p>{userData.name}</p>
        </li>
        <li>
          <p className='list-name'>Количество отзывов</p>
          <p>{!!userData.reviews && userData.reviews.length}</p>
        </li>
      </ul>
      <button className='button-exit' onClick={handleExit}>Выход</button>
    </div>
  )
}
