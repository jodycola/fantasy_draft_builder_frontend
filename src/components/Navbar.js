import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Navbar() {
    return (
        <div>
            <NavLink exact to="/">
                Home
            </NavLink>

            <NavLink exact to="/profile">
                Profile
            </NavLink>

            <NavLink exact to="/team">
                Team
            </NavLink>

        </div>
    )
}
