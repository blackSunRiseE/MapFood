import React,{Fragment,useState,useEffect} from 'react'
import { faCircleH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Login.css'
import LoginMenu from './LoginMenu'
import LK from './LK'

export default function Login(props) {
  const[isOpen,setIsOpen] = useState(props.isLoginOpen)
  const[isAuth,setIsAuth] = useState(false)

  useEffect(()=>{setIsOpen(props.isLoginOpen)},[props.isLoginOpen])

  
  const deleteAuth = () =>{
    setIsAuth(false)

  }

  const setAuth = () =>{
    setIsAuth(true)

  }
  const handleOpen =()=>{
    setIsOpen(!isOpen)
  }
  return (
    <Fragment>
    <div className='login-container'>
        <FontAwesomeIcon icon={faCircleH} size="2xl" color="midnightblue" onClick={handleOpen} className='login-icon'/>
       {(isOpen && !isAuth) && <LoginMenu setAuth={setAuth}/>}
       { (isOpen && isAuth) && <LK isAuth={deleteAuth}/>}
    </div>
    
    </Fragment>
    
  )
}
