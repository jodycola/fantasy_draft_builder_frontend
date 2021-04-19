import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

export default function Player({ player }) {
    const location = useLocation()
    const currentTeam = useSelector( state => state.team )
    const { first_name, last_name, plays_for_team } = player
    const history = useHistory()

    function displayPlayer(){
        history.push({
            pathname: `/player/${player.id}`,
            state: {player}
        })
    }

    function addPlayerToTeam(){
        fetch(`http://localhost:3000/contract`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({team_id: currentTeam.id, player_id: player.id}),
        })
        .then(r => r.json())
    }
    
    return (
        <div className="player-card">
            <hr/>
            <strong> {last_name}, {first_name} </strong> | {plays_for_team} | Salary Amount
            <p> 
            <Button onClick={displayPlayer}> Details </Button> 
            <Button onClick={addPlayerToTeam}> Add to team </Button>
            </p>
            <hr/>
        </div>
    )
}
