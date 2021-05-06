import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updateName, updateEmail, updatePassword } from '../redux/userSlice'
import { Modal, Button, Form } from 'react-bootstrap'

export default function Profile() {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector( state => state.user )

    const [showNameForm, setShowNameForm] = useState(false)

    const [showEmailForm, setShowEmailForm] = useState(false)

    const [showPasswordForm, setShowPasswordForm] = useState(false)

    const [deleteConfirmation, setDeleteConfirmation] = useState(false)


    const [edit, setEdit] = useState({ name: "", email: "", password: "", verify: "", confirm: "" })
    const { name, email, password, verify, confirm } = edit

    function handleChange(event){
        setEdit({...edit, [event.target.name]: event.target.value})
    }

    function handleNameChange(){
        fetch(`http://localhost:3000/user/${currentUser.id}/updatename`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: edit.name,
                verify: edit.password,
                email: currentUser.email,
                password: currentUser.password})
    })
        .then(r => r.json())
        .then(dispatch( updateName({ ...currentUser, name }) ),
            setShowNameForm(!showNameForm),
            setEdit({ name: "", email: "", password: "", verify: "", confirm: "" })
        )
    }

    function handleEmailChange(){
        fetch(`http://localhost:3000/user/${currentUser.id}/updateemail`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: edit.email,
                verify: edit.password,
                name: currentUser.name,
                password: currentUser.password})
    })
        .then(r => r.json())
        .then( dispatch( updateEmail({ ...currentUser, email }) ),
            setShowEmailForm(!showEmailForm),
            setEdit({ name: "", email: "", password: "", verify: "", confirm: "" })
        )
    }

    function handlePasswordChange(){
        fetch(`http://localhost:3000/user/${currentUser.id}/updatepassword`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                verify: edit.verify,
                password: edit.password, 
                confirm: edit.confirm,
                name: currentUser.name,
                email: currentUser.email})
    })
        .then(r => r.json())
        .then( dispatch( updatePassword({ ...currentUser, password }) ),
            setShowPasswordForm(!showPasswordForm),
            setEdit({ name: "", email: "", password: "", verify: "", confirm: "" })
        )
    }

    function deleteProfile(){
        fetch(`http://localhost:3000/user/${currentUser.id}/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: edit.password, verify: edit.verify })
        })
        .then(r => r.json())
        .then( dispatch( logoutUser() ), history.push("/login")
        )
    }

    return (
    <div className="profile-edit">
            <h1 style={{color: "white"}}> Edit Profile </h1>
                <p style={{color: "white"}}> Name: {currentUser.name} </p>
                <p style={{color: "white"}}> Email: {currentUser.email} </p>
            <Button onClick={() => setShowNameForm(!showNameForm)}>Change Name</Button>
            <Button onClick={() => setShowEmailForm(!showEmailForm)}>Change Email</Button>
            <Button onClick={() => setShowPasswordForm(!showPasswordForm)}>Change Password</Button>
            <Button onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Delete Profile</Button>

      <Modal show={showNameForm} backdrop="static">
          <Modal.Title>Change your name</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name} onChange={handleChange} name="name" type="name" placeholder="Enter new name" />

                    <Form.Label>Verify password</Form.Label>
                    <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Verify your password" />
                </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameForm(!showNameForm)}>Close</Button>
          <Button variant="primary" onClick={handleNameChange}>Confirm</Button>
        </Modal.Footer>
        </Modal>

        <Modal show={showEmailForm} backdrop="static">
          <Modal.Title>Change your email address</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Label>Change your email</Form.Label>
                    <Form.Control value={email} onChange={handleChange} name="email" type="name" placeholder="Enter new email address"/>

                    <Form.Label>Verify password</Form.Label>
                    <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Verify your password"/>
                </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailForm(!showEmailForm)}>Close</Button>
          <Button variant="primary" onClick={handleEmailChange}>Confirm</Button>
        </Modal.Footer>
        </Modal>

        <Modal show={showPasswordForm} backdrop="static">
          <Modal.Title>Change your password</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control value={verify} onChange={handleChange} name="verify" type="password" placeholder="Enter your current password" />

                   <Form.Label>New password</Form.Label>
                   <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Enter your new password" />

                   <Form.Label>Confirm new password</Form.Label>
                   <Form.Control value={confirm} onChange={handleChange} name="confirm" type="password" placeholder="Verify your new password" />
                </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordForm(!showPasswordForm)}>Close</Button>
          <Button variant="primary" onClick={handlePasswordChange}>Confirm</Button>
        </Modal.Footer>
        </Modal>

        <Modal show={deleteConfirmation} backdrop="static">
          <Modal.Title>Are you sure you want to delete your profile?</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control value={password} onChange={handleChange} name="password" type="password" placeholder="Enter your password" />

                   <Form.Label>Verify password</Form.Label>
                   <Form.Control value={verify} onChange={handleChange} name="verify" type="password" placeholder="Verify your password" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setDeleteConfirmation(!deleteConfirmation)}>Close</Button>
                <Button variant="primary" onClick={deleteProfile}>Confirm</Button>
            </Modal.Footer>
        </Modal>

    </div>
    )
}
