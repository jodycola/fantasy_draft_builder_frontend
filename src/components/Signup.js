import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/userSlice"
import { useHistory } from 'react-router-dom'

export default function Signup() {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState({ name: "", email: "", password: "", password_verify: "" })
    const { name, email, password, password_verify } = formData

    function handleToggle(){
        setToggle(!toggle)
    }

    function handleChange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault()
        if ( password === password_verify ) {
            fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formData),
            })
            .then(r => r.json())
            .then(data => {
                dispatch( setUser( data.user ) )
                localStorage.setItem("token", data.token)
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    password_verify: ""
                })
            history.push("/")
            })
        }
    }

    return (
        <div>
          <p> Don't have an account? Get started today <button onClick={handleToggle}> Signup </button>  </p>
          { toggle ?
            <form onSubmit={handleSubmit}>
                <label> Enter your username </label>
                <input type="text" name="name" value={name} onChange={handleChange}/>

                <label> Enter your email </label>
                <input type="text" name="email" value={email} onChange={handleChange}/>

                <label> Enter your password </label>
                <input type="password" name="password" value={password} onChange={handleChange}/>

                <label> Verify your password </label>
                <input type="password" name="password_verify" value={password_verify} onChange={handleChange}/>

                <label> Signup Now </label>
                <input type="submit"/>
            </form>
            :

            null
          }
        </div>
    )
}
