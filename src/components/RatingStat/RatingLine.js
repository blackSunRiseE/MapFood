import React,{useRef,useEffect,useCallback} from 'react'
import './RatingLine.css'

export default function RatingLine(props) {
  const filled = useRef(null);
  useEffect(()=>{
    filled.current.style.width = `${props.freq*223}px`;
  },[props.freq])
//   const measuredRef = useCallback(node => {
//     if (node !== null) {
//       setHeight(node.getBoundingClientRect().height);
//     }
//   }, []);  
  return (
    <div className='rating-line-container'>
        <p>{props.value}</p>
        <div className='line-container'>
            <div className='line-filled' ref={filled}></div>
        </div>
    </div>
  )
}
