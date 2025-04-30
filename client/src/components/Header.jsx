import React from 'react'
import { useAuth } from '../Contexts/AuthContext';
function Header() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
    } = useAuth()

    const logIn = (e) => {
        e.preventDefault()
        setAuthUser({ name: "John Doe" })
        setIsLoggedIn(true)
    }
    const logOut = (e) => {
      e.preventDefault()
      setAuthUser(null)
      setIsLoggedIn(false)
  }
  return (
    <>
      {console.log(`User is currently ${isLoggedIn ? ' logged in' : ' logged out'}`)}
      {isLoggedIn ? <h1>Welcome, {authUser.name}</h1> : <h1>Please log in</h1>}
    {isLoggedIn
      ? <button onClick={(e)=>{logOut(e)}}>Log Out</button>
      : <button onClick={(e)=>{logIn(e)}}>Log In</button>}
    </>
  )
}

export default Header