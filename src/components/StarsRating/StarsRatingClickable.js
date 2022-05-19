import React,{useState} from 'react'

import StarClickable from './StarClickable'
import "./StarsRatingClickable.css"

export default function StarsRatingClickable(props) {
  const [value,setValue] = useState(["grey","grey","grey","grey","grey"])

const clickHandle = (index)=> {
  
  const counter = value.reduce((count,val)=>{
    if(val === "gold") 
      count+=1
    return count
    },0)
  if(counter === (index+1)){
    index--
  }
  props.starsValue(index+1)
  const tmpValue = value.map((item,i) =>{
    if(i <= index) return "gold"
    else return "grey"
  })
  setValue(tmpValue)
}
  return (
    <div className='stars-rating-click'>
        {value.map((el,index)=>
           <StarClickable color={el} key={index} index={index} clickHandle={clickHandle}/>
        )}
    </div>
  )
}
