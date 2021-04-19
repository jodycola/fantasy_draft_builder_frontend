import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectTeam, removePlayer } from "../redux/teamSlice"
import MyPlayer from './MyPlayer'
import Search from './Search'
import { Button, Card, Modal } from 'react-bootstrap'

export default function TeamCard({ team, contracts, myTeams, setMyTeams }) {
    const dispatch = useDispatch()

    const [confirmation, setConfirmation] = useState(false)
    const [finder, setFinder] = useState(false)

    const displayRoster = contracts.map(player => { 
        return <MyPlayer reference={player} key={player.id} removeFromTeam={removeFromTeam}/>
    })

    function editTeam(){
        dispatch(selectTeam(team))
    }

    function deleteTeam(){
        fetch(`http://localhost:3000/team/${team.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            })
        .then(r => r.json())
        .then(team => setMyTeams(myTeams.filter((myTeam) => team.id !== myTeam.id) ))
    }

    function addToTeam(){
        dispatch(selectTeam(team))
        setFinder(!finder)
    }

    function removeFromTeam(player){
        dispatch(selectTeam(team))
        fetch(`http://localhost:3000/team/${team.id}/${player.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(player => dispatch(removePlayer(player)))
    }

    return (
        <div>
            <Card style={{ height: '18rem', width: '18rem', flex: "1" }}>
            <Card.Body>
                <Card.Title>{team.team_name} </Card.Title>
                <Card.Title style={{align: 'right', color: 'green'}}> FUNDS: ${team.salary} </Card.Title>
                <Card.Text>
                    {displayRoster}
                    <Button onClick={addToTeam}> + </Button>
                </Card.Text>
                    <NavLink exact to={`/team/${team.id}/view`}>
                        <Button onClick={editTeam}> Edit Team </Button>
                    </NavLink>
                        <Button variant="danger" onClick={() => setConfirmation(!confirmation)}> Delete Team </Button>
            </Card.Body>
            </Card>

        <Modal show={confirmation} backdrop="static">
          <Modal.Title> <center> Are you sure you want to delete this team? </center> </Modal.Title>
            <Modal.Body>
                <center>
                    <Button variant="secondary" onClick={() => setConfirmation(!confirmation)}>Close</Button>
                    <Button variant="primary" onClick={deleteTeam}>Confirm</Button>
                </center>
            </Modal.Body>
        </Modal>

        <Modal show={finder} backdrop="static">
            <Modal.Title> <center> Search for a player </center> </Modal.Title>
                <Modal.Body>
                    <Search/>
                </Modal.Body>
            <Modal.Footer> <Button variant="secondary" onClick={() => setFinder(!finder)}>Close</Button> </Modal.Footer>
        </Modal>
        </div>
    )
}
