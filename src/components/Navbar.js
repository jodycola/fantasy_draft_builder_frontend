import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../redux/userSlice"
import { NavLink, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Navbar() {
    const currentUser = useSelector( state => state.user )

    const dispatch = useDispatch()
    const history = useHistory()

    // Logs a user out and removes local stroage token
    function handleLogout(){
      history.push("/")
      localStorage.removeItem("token")
      dispatch(logoutUser())
     }

    return (
        <div className="nav-bar">
            { currentUser ? <>         
            <NavLink exact to="/">
                <Button> Home </Button>
            </NavLink>

            <NavLink exact to="/profile">
                <Button> Profile </Button>
            </NavLink>

            <NavLink exact to="/team">
                <Button> Team </Button>
            </NavLink>
            <Button onClick={handleLogout}> Logout </Button> </>
            : 
            <>
            <NavLink exact to="/">
                <Button> Home </Button>
            </NavLink>

            <NavLink exact to="/login">
                <Button> Login </Button>
            </NavLink> </> }
        </div>
    )
}
