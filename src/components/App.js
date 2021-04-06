import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, removeUser } from "../redux/userSlice"
import Search from './Search'
import Login from './Login'

function App() {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState(null);

  
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
    dispatch(removeUser())
  }


  return (
    <div className="App">
      <h1> App </h1>
      <Login 
        currentUser={currentUser}
      />
      <Search />
      { currentUser ? <button onClick={handleLogout}> Logout </button> : <p> Login </p>}
    </div>
  );
}

export default App;
