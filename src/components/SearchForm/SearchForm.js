import React,{useState,Fragment} from 'react'
import { useNavigate } from "react-router-dom"

import './SearchForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faLocationDot,faXmark } from '@fortawesome/free-solid-svg-icons'


export default function SearchForm(props) {
  let navigate = useNavigate()
  const [searchText,setSearchText] = useState('')
  const [isOpen,setIsOpen] = useState(true)
  const [matchList,setMatchList] = useState(["1",'2','3'])
  
  const submitSearch = (event) =>{
    event.preventDefault()
    setIsOpen(false)
    props.submitSearch(searchText)
  }

  const changeSearchText = (event) =>{
    setIsOpen(true)
    setSearchText(event.target.value)
    props.changeSearch(event.target.value)
  }
  const handleListItemClick = (event) =>{
    const selectedIndex = event.target.getAttribute('data-id');
    navigate(`/place/${selectedIndex}`)
  }
  const submitClearSearch = (event) =>{
    event.preventDefault()
    setSearchText('')
    setIsOpen(false)
    props.submitClear()
  }
  return (
    <Fragment>
      <form className='search-container'>
          <input type='text' placeholder='Поиск' className='search-text' value={searchText} onChange={changeSearchText}></input>
          <div className='search-button-container'>
            <button type='submit' className='search-button' onClick={submitSearch} placeholder=''>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" color="black" className="glass"/>
            </button>
            <button className='search-button times-button' onClick={submitClearSearch} placeholder=''>
              <FontAwesomeIcon icon={faXmark} size="xl" color="black" className="glass"/>
            </button>
            
          </div>
      </form>
      {!!(!!searchText && props.matchList.length && isOpen) &&
      <ul className='match-list'>
        {props.matchList.map((item)=>{
          return <li className='match-list-item' key={item.place_id} onClick={handleListItemClick} data-id={item.place_id}><FontAwesomeIcon icon={faLocationDot} size="sm" color="grey" /><span>{item.name}</span></li>
        })}
      </ul>}
      
    </Fragment>
  )
}
