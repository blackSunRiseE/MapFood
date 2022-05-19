import React,{useState} from 'react'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  './LoginForm.css'
export default function LoginForm(props) {
    const [loginValue,setLoginValue] = useState("")
    const [passwordValue,setPasswordValue] = useState("")
    const [success,setSuccess] = useState(true)
    const submitForm = (event)=>{
        event.preventDefault()
        if(loginValue&&passwordValue)
        {
            fetch('/login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({'login':loginValue,'password':passwordValue})
              }).then(response=> response.json()
              )
              .then(result=>{
                  if(result.success){
                    localStorage.setItem('JWT',result.JWT)
                    localStorage.setItem('user',result.name)
                    localStorage.setItem('userId',result.id)
                    props.success()
                  }
                  else{
                    setSuccess(false)
                  }
              })
        }
        
    }
    const loginChange =(event)=>{
        setLoginValue(event.target.value)
    }
    const passwordChange =(event)=>{
        setPasswordValue(event.target.value)
    }
    return (
    <form onSubmit={submitForm} className='login-form'>
        <FontAwesomeIcon icon={faCircleUser} size="5x" color="gray"/>
        <label>
            Имя
            <input type="text" className={`login-input ${!loginValue?'red-outline':'blue-outline'}`} placeholder='Введите логин' value={loginValue} onChange={loginChange}></input>
        </label>
        <label>
            Пароль
            <input type="password" className={`pasword-input ${!passwordValue?'red-outline':'blue-outline'}`} placeholder='Введите пароль' value={passwordValue} onChange={passwordChange}></input>
        </label>
            <input type='submit' className='login-submit' value="Войти"></input>
    </form>
  )
}
