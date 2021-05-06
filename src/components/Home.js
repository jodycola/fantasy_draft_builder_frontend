import React, { useState } from 'react'
import Game from './Game'
import { Button } from 'react-bootstrap'

export default function Home() {
    const [games, setGames] = useState([])

    let today = new Date();
    let year = String(today.getFullYear())
    let month = String(today.getMonth() + 1).padStart(2, '0')
    let day = String(today.getDate()).padStart(2, '0')
    let date = year+'-'+month+'-'+day

    function refresh() {
        fetch(`https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=2020-2021&league=12&date=${date}`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_NBA_KEY,
                "x-rapidapi-host": process.env.REACT_APP_NBA_HOST
            }
        })
        .then(r => r.json())
        .then(data => setGames(data.response))
        .catch(error => error)
    }

    const todaysGames = games.map((game) => {
        return <Game key={game.id} game={game}/> })

    return (
        <div className="home-div">
            <Button variant="success" onClick={refresh}> Show Games</Button>

        <div className="home-logo" style={{textAlign: "center"}}>
            <img style={{webkitFilter: "invert(1)", filter: "invert(1)"}} src='https://png.vector.me/files/images/2/5/250513/basketball_net_preview' alt='basketball-hoop'/>
            <h2 style={{color: "white", fontSize: "4rem"}}>Fantasy All-Stars</h2>
        </div>

        <div className="game-feed">
            <center> {todaysGames} </center>
        </div>

        </div>
    )
}
