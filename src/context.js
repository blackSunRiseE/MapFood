import React from 'react'

let OpenSideBarContext = React.createContext(null)
let mapIsClickable = React.createContext({
    isOpen:false,
    setIsOpen :()=>{}

    })
export default mapIsClickable