import React,{useState,useEffect} from 'react'
import RatingLine from './RatingLine'

import './RatingStat.css'
import StarsRating from '../StarsRating/StarsRating'
import { faPersonPraying } from '@fortawesome/free-solid-svg-icons'
export default function RatingStat(props) {
    const stat = [1,2,3,4,5,4,3,5,5,4,5,2]
    const rate =[5,4,3,2,1]
    const [avgScore,setAvgScore] = useState(4)
    useEffect(()=>{
        if(isNaN(props.score))
        setAvgScore(props.score.reduce((acc,item)=>{return acc+item},0)/props.score.length)
    },[props.score])
    const calculateFreq = (index) =>{
        const result =props.score.reduce((acc,item)=>{
            if(item === index)
                acc+=1
            return acc  
        },0)
        let max  = 0
        rate.forEach(element => {
            const el = props.score.reduce((acc,item)=>{
                if(item === element)
                    acc+=1
                return acc  
            },0)
            if(el >max)
            max = el
        });
        return result/max;
    }
  return (
    <div className='rating-container'>
        <div className='rating-bar'>
            {rate.map((item)=><RatingLine freq={calculateFreq(item)} value={item}/>)}
        </div>
        <div className='rating-num'>
            <p>{avgScore}</p>
            {!isNaN(avgScore)&&<StarsRating score={4}/>}
            <span>Отзывов: {props.score.length}</span>
        </div>
    </div>
  )
}
