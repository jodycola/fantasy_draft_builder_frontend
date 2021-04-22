import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const currentUser = useSelector( state => state.user )

    return (
        <div className="nav-bar">
            { currentUser ? <>         
            <NavLink exact to="/">
                Home
            </NavLink>

            <NavLink exact to="/profile">
                Profile
            </NavLink>

            <NavLink exact to="/team">
                Team
            </NavLink> </> 
            : 
            <>
            <NavLink exact to="/">
                Home
            </NavLink>

            <NavLink exact to="/login">
                Login
            </NavLink> </> }
        </div>
    )
}
