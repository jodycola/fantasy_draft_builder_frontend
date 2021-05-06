import React, { useEffect } from 'react'
import { Switch, Route } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setUser } from "../redux/userSlice"
import Navbar from './Navbar'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import Team from './Team'

export default function App() {
  const dispatch = useDispatch()

  // Sets current user local storage token
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3000/auth", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(r => r.json())
        .then(userData => {
          dispatch(setUser(userData))
        })
    }
  }, [ dispatch ])

  return (
    <div className="app">
      <>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/team" component={Team}/>
        </Switch>
      </>
    </div>
  );
}
