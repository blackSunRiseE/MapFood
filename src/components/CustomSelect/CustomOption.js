import React from 'react'
import './CustomOption.css'

export default function CustomOption(props) {
    const handleSelect = () =>{
        props.handleSelect(props.value)
    }
  return (
    <div className='option-container' onClick={handleSelect}>{props.value}</div>
  )
}
