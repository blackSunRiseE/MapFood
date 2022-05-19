import React,{useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './LoginMenu.css'

export default function LoginMenu(props) {
    const [isLogin,setIsLogin] = useState(true)

    const handleToggleEnter = () =>{
        setIsLogin(true)
    }
    const handleToggleReg = () =>{
        setIsLogin(false)
    }
    const handleSuccess = () =>{
        props.setAuth()
    }
    return (
        <div className='login-menu-container'>
            {isLogin?<LoginForm success={handleSuccess}/>:<RegisterForm success={handleSuccess}/>}
            <div className='toggle-login'>
                <button className='enter-button' onClick={handleToggleEnter}>Войти</button>
                <button className='register-button' onClick={handleToggleReg}>Регистрация</button>
            </div>
        </div>
    )
}
