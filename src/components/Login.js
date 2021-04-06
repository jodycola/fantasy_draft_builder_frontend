import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/userSlice"

function Login({ currentUser }) {
    const dispatch = useDispatch()
    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    })

    function handleChange(e){
        setFormLogin({
            ...formLogin, [e.target.name]: e.target.value
        })
    }

    function handleLogin(e){
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(formLogin),
        })
        .then(r => r.json())
        .then(data => {
            dispatch( setUser( data.user ) )
            localStorage.setItem("token", data.token)
            setFormLogin({
                email: "",
                password: ""
            })
        })

    }

    return (
        <>
            { currentUser ? <h1> Hello {currentUser.name} </h1> :
            <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              className="login-form-1"
              type="text"
              name="email"
              value={formLogin.email}
              onChange={handleChange}
            />
            <br/>

            <label>Password</label>
            <input
              className="login-form-2"
              type="password"
              name="password"
              value={formLogin.password}
              onChange={handleChange}
            />
            <br/>
            <button type="submit">Login</button>
          </form>
        }
        </>
    )
}

export default Login