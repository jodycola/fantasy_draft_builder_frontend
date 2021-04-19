import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

export default function MyPlayer({ reference, removeFromTeam }) {
    const [player, setPlayer] = useState([])

    useEffect(() => {
        fetch(`https://www.balldontlie.io/api/v1/players/${reference.player_id}`)
        .then(r => r.json())
        .then(playerData => setPlayer(playerData))
    }, [reference.player_id])

    function viewPlayer(){
        console.log(player)
    }

    return (
        <div>
            {player.first_name} {player.last_name} <Button onClick={() => removeFromTeam(player)}> - </Button> <Button onClick={viewPlayer}> o </Button>
        </div>
    )
}
