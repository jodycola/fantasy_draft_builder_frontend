import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

export default function PlayerCard() {
    const [stats, setStats] = useState([])
    const location = useLocation()
    const history = useHistory
    const currentUser = useSelector( state => state.user )

    useEffect(() => {
        const id = location.pathname.split("/").slice(-1)
        fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`)
            .then(r => r.json())
            .then(data => setStats(data.data[0]))
            // eslint-disable-next-line
    }, [])

    function addToTeamRoster(){
        fetch(`http://localhost:3000/contract`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({team_id: currentUser.teams[0]["id"], player_id: location.state.player.id}),
        })
        .then(r => r.json())
        // update teamSlice here
    }

    function historyBack() {
        history.goBack()
    }

    return (
        <div>
            <h1> {location.state.player.first_name} {location.state.player.last_name} </h1>
            <p> assist: {stats.ast} </p>
            <p> blocks: {stats.blk} </p>
            <p> rebounds: {stats.reb} </p>
            <p> points: {stats.pts} </p> 
            <p> steals: {stats.stl} </p>
            <p> turnovers: {stats.turnover} </p> 
            <p> 3pt%: {stats.fg3_pct} </p> 
            <p> fg%: {stats.fg_pct} </p>
            <Button onClick={addToTeamRoster}> Add to team </Button>
            <Button onClick={historyBack}> Go Back </Button>
        </div>
    )
}
