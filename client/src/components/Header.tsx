import React from 'react'
import { useAuth } from '../Contexts/AuthContext';
function Header() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    } = useAuth()


  return (
    <div>Header</div>
  )
}

export default Header