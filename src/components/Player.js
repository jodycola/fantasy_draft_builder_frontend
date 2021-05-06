import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

export default function Player({ player, roster, setRoster }) {
    const currentTeam = useSelector( state => state.team )

    const { first_name, last_name, plays_for_team } = player
    const [stats, setStats] = useState([])

    useEffect(() => {
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${player.id}`)
            .then(r => r.json())
            .then(data => setStats(data.data[0]))
            .catch(error => error)
        // eslint-disable-next-line 
    }, [])

    function addPlayerToTeam(){
        fetch(`http://localhost:3000/contract`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({team_id: currentTeam.id, player_id: player.id}),
        })
        .then(r => r.json())
        .then(window.location.reload())
    }
    
    return (
        <div className="player-card">
            <hr/>
            <strong> {last_name}, {first_name} </strong> | <em> {plays_for_team} </em>
            <p> 
            <strong> points: </strong> { stats ? `${stats.pts}` : 0 } |
            <strong> assist: </strong> { stats ? `${stats.ast}` : 0 } |
            <strong> blocks: </strong> { stats ? `${stats.blk}` : 0 } |
            <strong> rebounds: </strong> { stats ? `${stats.reb}` : 0 } |
            <strong> steals: </strong> { stats ? `${stats.stl}` : 0 } |
            <strong> turnovers: </strong> { stats ? `${stats.turnover}` : 0 } |
            </p> 
            <Button variant="success" onClick={addPlayerToTeam}> Add to team </Button>
            <hr/>
        </div>
    )
}
