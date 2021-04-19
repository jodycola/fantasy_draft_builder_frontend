import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function TeamView() {
    const [roster, setRoster] = useState([])
    const currentTeam = useSelector( state => state.team )



    useEffect(() => {
        fetch(`http://localhost:3000/team/${currentTeam.id}/roster`)
            .then(r => r.json())
            .then(players => setRoster([...roster, players]))
            // eslint-disable-next-line 
    }, [])


    return (
        <div>
            {currentTeam.team_name}
        </div>
    )
}
