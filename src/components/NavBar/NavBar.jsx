import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
const NavBar = () => {
    const navigate=useNavigate()
  return (
    <div>NavBar
       <Link to="/settings">Settings</Link>
       <Link to="/">Auth</Link>
       <Link to="/chat"> Chat
       </Link>
    </div>
  )
}

export default NavBar