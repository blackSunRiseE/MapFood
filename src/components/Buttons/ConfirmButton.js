import React from 'react'
import './ConfirmButton.css'

export default function ConfirmButton(props) {
  const clickHandler = () =>{
    props.clickHandler()
  }
  return (
    <button className='button-content' onClick={clickHandler}>{props.value}</button>
  )
}
