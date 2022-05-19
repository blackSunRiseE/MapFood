import React from 'react'
import {  faStarOfDavid } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './StarsRating.css'

export default function StarsRating(props) {
  return (
    <div className='star-rate'>
        {Array.apply(null, Array(props.score)).map(el=><FontAwesomeIcon icon={faStarOfDavid} size="xs" color="gold" className='star'/>)}
        {Array.apply(null, Array(5-props.score)).map(el=><FontAwesomeIcon icon={faStarOfDavid} size="xs" color="grey" className='star'/>)}
    </div>
  )
}
