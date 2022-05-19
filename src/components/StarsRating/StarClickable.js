import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faStarOfDavid } from '@fortawesome/free-solid-svg-icons'
import "./StarClickable.css"

export default function StarClickable(props) {
  const handedClick =() =>{
    props.clickHandle(props.index)
  }
  return (
    <FontAwesomeIcon icon={faStarOfDavid} size="xl" color={props.color} className='star-clickable' onClick={handedClick}/>
  )
}
