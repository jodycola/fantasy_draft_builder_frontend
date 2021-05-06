import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TeamCard from './TeamCard'
import { Button, CardGroup, Form, Modal } from 'react-bootstrap'

export default function Team() {
    const dispatch = useDispatch()
    const [showCreate, setShowCreate] = useState(false)
    const [request, setRequest] = useState(false)
    const [myTeams, setMyTeams] = useState([])
    const currentUser = useSelector( state => state.user )

    const [create, setCreate] = useState({ team_name: "" })
    const { team_name } = create
    
    function handleChange(event){
        setCreate({...create, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        fetch(`http://localhost:3000/team/${currentUser.id}`)
        .then(r => r.json())
        .then(teams => setMyTeams(teams))
    }, [currentUser.id])

    useEffect(() => {
        if (request) {
            fetch(`http://localhost:3000/team/${currentUser.id}/new`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ create })
            })
            .then(r => r.json())
            .then(teams => setMyTeams(teams))
            setRequest(!request)
            setCreate({ team_name: "" })
        }
    }, [ dispatch, request, create, currentUser.id])

    const showTeams = myTeams.map((team) => { 
        return <TeamCard team={team} key={team.id} contracts={team.contracts} myTeams={myTeams} setMyTeams={setMyTeams}/>
    })

    return (
        <div>
            <h1 style={{color: "white"}}> {currentUser.name}'s Teams </h1> <Button variant="success" onClick={() => setShowCreate(!showCreate)}> Create a new team </Button>
            <CardGroup style={{ display: "flex", flexWrap: "wrap"}}>

                {showTeams}

            </CardGroup>

            <Modal show={showCreate} backdrop="static">
                <Modal.Title>Create a new team</Modal.Title>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Team Name</Form.Label>
                            <Form.Control value={team_name} onChange={handleChange} name="team_name" type="name" placeholder="Enter new name" />
                        </Form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreate(!showCreate)}>Close</Button>
                    <Button variant="primary" onClick={() => { setRequest(!request); setShowCreate(!showCreate); }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
