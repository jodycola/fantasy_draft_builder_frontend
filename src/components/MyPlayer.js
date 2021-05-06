import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function MyPlayer({ reference, removeFromTeam }) {
    const [player, setPlayer] = useState([])

    useEffect(() => {
        fetch(`https://www.balldontlie.io/api/v1/players/${reference.player_id}`)
        .then(r => r.json())
        .then(playerData => setPlayer(playerData))
    }, [reference.player_id])

    return (
        <div className="player-list">
            <Button variant="danger" onClick={() => removeFromTeam(player)}> x </Button> {player.first_name} {player.last_name} 
            <hr/>
        </div>
    )
}
