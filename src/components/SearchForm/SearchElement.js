import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './SearchElement.css'

export default function SearchElement(props) {
  return (
    <li >
        <FontAwesomeIcon icon={faLocationDot} size="sm" color="grey"/>
        <span>{props.item.name}</span>
    </li>
  )
}
