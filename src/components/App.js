import React, { useEffect } from 'react'
import { Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logoutUser } from "../redux/userSlice"
import Navbar from './Navbar'
import Login from './Login'
import Home from './Home'
import Profile from './Profile'
import PlayerCard from './PlayerCard'
import Team from './Team'
import TeamView from './TeamView'
import { Button } from 'react-bootstrap'

export default function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector( state => state.user )

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

    // Logs a user out and removes local stroage token
    function handleLogout(){
      localStorage.removeItem("token")
      dispatch(logoutUser())
     }

  return (
    <div className="App">
      <>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/player/:player_id" component={PlayerCard}/>
          <Route exact path="/team" component={Team}/>
          <Route exact path="/team/:id/view" component={TeamView}/>
        </Switch>
        { currentUser ? <Button onClick={handleLogout}> Logout </Button> : null }
      </>
    </div>
  );
}
