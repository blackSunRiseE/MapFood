import React,{useState} from 'react'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './RegisterForm.css'

export default function RegisterForm(props) {
  const [loginValue,setLoginValue] = useState("")
  const [passwordValue,setPasswordValue] = useState("")
  const [nameValue,setNameValue] = useState("")
  const [passwordCheckValue,setPasswordCheckValue] = useState("")
  const [isValid,setIsValid] = useState(true)
  const submitForm = (event)=>{
    event.preventDefault()
    if(loginValue && nameValue && passwordValue && passwordCheckValue == passwordValue){
      fetch('/register',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({'login':loginValue,'password':passwordValue})
      }).then(response=>{
        if(response.status == 200){
          return response.json()
        }
        else if(response.status === 400){
          setIsValid(false)
        }
      }).then(result=>{
        console.log(result);
        localStorage.setItem('JWT',result.JWT)
        props.success()
      })
    }
    
  }
  const loginChange =(event)=>{
    setLoginValue(event.target.value)
  }
  const passwordChange =(event)=>{
    setPasswordValue(event.target.value)
  }
  const nameChange =(event)=>{
    setNameValue(event.target.value)
  }
  const passwordCheckChange =(event)=>{
    setPasswordCheckValue(event.target.value)
  }
  return (
    <form onSubmit={submitForm} className='login-form register'>
        <FontAwesomeIcon icon={faCircleUser} size="5x" color="gray"/>
        <label>
            Имя
            <input type="text" className={`login-input ${!nameValue?'red-outline':'blue-outline'}`} placeholder='Введите имя' value={nameValue} onChange={nameChange}></input>
        </label>
        <label>
            Логин
            <input type="text" className={`login-input ${!loginValue?'red-outline':'blue-outline'}`} placeholder='Введите логин' value={loginValue} onChange={loginChange}></input>
        </label>
        <label>
            Пароль
            <input type="password" className={`login-input ${!passwordValue?'red-outline':'blue-outline'}`} placeholder='Введите пароль' value={passwordValue} onChange={passwordChange}></input>
        </label>
        <label>
            Повторите пароль
            <input type="password" className={`login-input ${!(passwordValue && passwordValue == passwordCheckValue)?'red-outline':'blue-outline'}`} placeholder='Введите пароль' value={passwordCheckValue} onChange={passwordCheckChange}></input>
        </label>
            <input type='submit' className='login-submit' value="Войти" ></input>
    </form>
  )
}
