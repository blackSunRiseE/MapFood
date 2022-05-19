import React,{useState} from 'react'
import CustomSelect from '../CustomSelect/CustomSelect'
import './Search.css'

export default function Search(props) {
  const [searchData,setSearchData] = useState("")
  
  const selectHandle = (id)=>{
    switch (id) {
      case 0:
        props.sortOrder((a,b)=>b.userInfo.reviewCount-a.userInfo.reviewCount)
        break;
      case 1:
        props.sortOrder((a,b)=>{
          if(isNaN(new Date(a.date) - new Date(b.date))){
            return - 1;
          }
          return new Date(a.date)-new Date(b.date)})
        break;
      case 2:
        props.sortOrder((a,b)=>b.rating-a.rating)
        break;
      case 3:
        props.sortOrder((a,b)=>a.rating-b.rating)
        break;  
      default:
        break;
    }
  }
  const handleSubmit =(event)=>{
    event.preventDefault()
    props.searchString(searchData)
  }
  const handleChange =(event)=>{
    setSearchData(event.target.value)
    
  }
  
  return (
    <form className='search-form' onSubmit={handleSubmit}>
        <input type='search' placeholder='Поиск отзывов' value={searchData} onChange={handleChange}></input>
           <CustomSelect options={["Самые релевантные","Сначала новые","По убыванию рейтинга","По возрастанию рейтинга"]} selected={1} selectHandle={selectHandle}/>
    </form>
  )
}
