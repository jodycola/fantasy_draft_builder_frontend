import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectTeam, removePlayer } from "../redux/teamSlice"
import MyPlayer from './MyPlayer'
import Search from './Search'
import { Button, Card, Modal } from 'react-bootstrap'

export default function TeamCard({ team, contracts, myTeams, setMyTeams }) {
    const dispatch = useDispatch()

    const [roster, setRoster] = useState([])

    const [points, setPoints] = useState(0)

    const [confirmation, setConfirmation] = useState(false)
    const [finder, setFinder] = useState(false)

    let yesterday = new Date()
    let year = String(yesterday.getFullYear())
    let month = String(yesterday.getMonth() + 1).padStart(2, '0')
    let day = String(yesterday.getDate()-1).padStart(2, '0')
    let date = year+'-'+month+'-'+day
    
    const showRoster = roster.map(player => { 
        return <MyPlayer reference={player} key={player.id} removeFromTeam={removeFromTeam}/>
    })

    useEffect(() => {
        fetch(`http://localhost:3000/team/${team.id}`)
        .then(r => r.json())
        .then(rosterData => setRoster(rosterData[0].contracts))
        .catch(error => error)
    }, [team.id])

    useEffect(() => {
        contracts.forEach(player => { 
            fetch(`https://www.balldontlie.io/api/v1/stats?dates[]=${date}&player_ids[]=${player.player_id}`)
                .then(r => r.json())
                .then(data =>  {
                    fetch(`http://localhost:3000/contract/${player.player_id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify({ points: data.data[0].pts })
                    })
                    .then(r => r.json())
                    .catch(error => error)
                })
                .catch(error => error)
      })
      calculatePoints()
    }, [contracts, date])

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
        if (finder) {
            window.location.reload()
        }
    }

    function removeFromTeam(player){
        dispatch(removePlayer(player))
        dispatch(selectTeam(team))
        fetch(`http://localhost:3000/team/${team.id}/${player.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(r => r.json())
        .then(window.location.reload())
    }
    
    function calculatePoints(){
        fetch(`http://localhost:3000/team/${team.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ points: 10 })
        })
        .then(r => r.json())
        .then(data => setPoints(data.points))
        .catch(error => error)
    }

    return (
        <div>
            <Card style={{ height: 'auto', width: '18rem', flex: "1", backgroundColor: "black" }}>
            <Card.Body style={{ backgroundColor: "#4B85FF", color: "white" }}>
                <Card.Title> <h4> {team.team_name} </h4> </Card.Title>
                <Card.Title> TEAM POINTS: {points} </Card.Title>
                <Card.Text>
                    {showRoster}
                </Card.Text>
                    <Button variant="success" onClick={addToTeam}> Add a new player </Button>
                    <Button variant="danger" onClick={() => setConfirmation(!confirmation)}> Delete team </Button>
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
                    <Button variant="secondary" onClick={() => setFinder(!finder)}> Close </Button>
                    <Search roster={roster} setRoster={setRoster}/>
                </Modal.Body>
        </Modal>
        </div>
    )
}
