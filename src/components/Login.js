import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/userSlice"
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Login() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [formToggle, setFormToggle] = useState(false)
    const [formSignupToggle, setFormSignupToggle] = useState(false)

    const [formLogin, setFormLogin] = useState({ email: "", password: ""})

    const [formSignup, setFormSignup] = useState({ name: "", email: "", password: "", password_verify: "" })

// Controlled input from forms
    function handleChange(e){
        setFormLogin({
            ...formLogin, [e.target.name]: e.target.value
        })
        setFormSignup({
            ...formSignup, [e.target.name]: e.target.value
        })
    }

// Button handler for login
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
            history.push("/")
        })

    }

    function showLogin(){
        setFormSignupToggle(false)
        setFormToggle(!formToggle)

    }

    function showSignup(){
        setFormToggle(false)
        setFormSignupToggle(!formSignupToggle)
    }

// Button handler for signup
    function handleSubmit(e){
        e.preventDefault()
        if ( formSignup.password === formSignup.password_verify ) {
            fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify(formSignup),
            })
            .then(r => r.json())
            .then(data => {
                dispatch( setUser( data.user ) )
                localStorage.setItem("token", data.token)
                setFormSignup({
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
    <>
    <div className="login">
        <div className="left">
        <h3> Log in to your account </h3>
        <Button onClick={showLogin}> Log in with email </Button> 
        { !formToggle ?  null :
        <center>
        <form onSubmit={handleLogin}>
            <div className="login-group">
            <input
              className="login-field"
              type="text"
              name="email"
              value={formLogin.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            </div>
            <br/>

            <div className="login-group">
            <input
              className="login-field"
              type="password"
              name="password"
              value={formLogin.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            </div>
            <br/>
            <Button className="login-btn" type="submit">Login</Button>
          </form>
          </center>
        }

            <div className="divide">
                <hr/>
                <center> <span> ━━━━━━ Or ━━━━━━ </span> </center>
                <hr/>
            </div>

        <hr/>
            <p> Don't have an account? Get started today </p>
            <Button onClick={showSignup}> Register a new account </Button> 
            { !formSignupToggle ?  null :
            <center>
            <form onSubmit={handleSubmit}>
                <div className="signup-group">
                <input 
                className="signup-field"
                type="text"
                name="name"
                value={formSignup.name}
                onChange={handleChange}
                placeholder="Enter your name"
                />
                </div>
                <br/>

                <div className="signup-group">
                <input
                className="signup-field"
                type="text"
                name="email"
                value={formSignup.email}
                onChange={handleChange}
                placeholder="Enter your email"
                />
                </div>
                <br/>

                <div className="signup-group">
                <input
                className="signup-field"
                type="password"
                name="password"
                value={formSignup.password}
                onChange={handleChange}
                placeholder="Enter your password"
                />
                </div>
                <br/>

                <div className="signup-group">
                <input
                className="signup-field"
                type="password"
                name="password_verify"
                value={formSignup.password_verify}
                onChange={handleChange}
                placeholder="Verify your password"
                />
                </div>
                <br/>

                <Button className="signup-btn" type="submit"> Sign up now </Button>
            </form>
            </center>
            }
        </div>

        <div className="right">
            <img style={{webkitFilter: "invert(1)", filter: "invert(1)"}} src='https://png.vector.me/files/images/2/5/250513/basketball_net_preview' alt='basketball-hoop'/>
            <h2 style={{fontSize: "50px", textAlign: "center"}}>Fantasy All-Stars</h2>
        </div>
    </div>


    </>
        
    )
}