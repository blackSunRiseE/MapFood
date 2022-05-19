import React,{useRef,useState} from 'react'
import './CustomSelect.css'
import CustomOption from './CustomOption'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CustomSelect(props) {
    const options = useRef()
    const [isOpen,setIsOpen] = useState(true)
    const [selectValue,setSelectValue] = useState('')
    const handleOpen = () =>{
        setIsOpen(!isOpen)
        options.current.style.visibility = `${isOpen?"visible":"hidden"}`
        
    }

    const handleSelect = (value) =>{
        setIsOpen(!isOpen)
        options.current.style.visibility = `${isOpen?"visible":"hidden"}`
        setSelectValue(value)
        props.selectHandle(props.options.findIndex((item) => item===value))
    }
  return (
    <div className='custom-select-container'>
        <div className='custom-select-selected' onClick={handleOpen}>
            <p>{!selectValue?props.options[0]:selectValue}</p>
            <FontAwesomeIcon icon={faCaretDown} size="sm" color="black" className='custom-select-arrow'/>
        </div>
        <div className='custom-select-options'  ref={options}>
            {props.options.map(option => <CustomOption value={option} handleSelect={handleSelect}/>)}
        </div>
    </div>
  )
}
