import React, { useEffect, useState, useRef } from 'react'
import Player from './Player'

function Search() {
    const [search, setSearch] = useState("")
    const [playerSearch, setPlayerSearch] = useState([])

    const [filter, setFilter] = useState("All")
    
    const timeout = useRef(null)


    const searchedPlayers = playerSearch.map((player) => {
        return <Player key={player.id} player={player}/>
    })

    function handleFilterChange(e){
        setPlayerSearch([])
        setFilter(e.target.value)
    }

    function clearSearch(){
        setPlayerSearch([])
        setSearch("")
        setFilter("All")
    }

    function searchingPlayers(){
        fetch(`http://localhost:3000/player/${search}/${filter}`)
        .then(r => r.json())
        .then(players => setPlayerSearch(players))
    }

    useEffect(() => {
        if (timeout.current !== null) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            timeout.current = null;
            search !== '' ? searchingPlayers() : setPlayerSearch([]);
        }, 1000)
    }, [search, filter])

    function handleFilter(e){
        e.preventDefault()
        fetch(`http://localhost:3000/players/${filter}`)
        .then(r => r.json())
        .then(players => setPlayerSearch(players))
    }

    return (
    <>
    <div className="Search">
            <label> Search for player </label>
            <form>
                <input type="text" value={search} placeholder="Find a player" onChange={(e) => setSearch(e.target.value)}/>
                <input type="submit"/>
            </form>
    </div>

    <div className="Filter">
        <label> Search by team </label><br/>
        <form onSubmit={handleFilter}>
        <select name="teams" size="5" defaultValue={filter} onChange={handleFilterChange}>
            <option value="Atlanta Hawks">Atlanta Hawks</option>
            <option value="Boston Celtics">Boston Celtics</option>
            <option value="Brooklyn Nets">Brooklyn Nets</option>
            <option value="Charlotte Hornets">Charlotte Hornets</option>
            <option value="Chicago Bulls">Chicago Bulls</option>
            <option value="Cleveland Cavaliers">Cleveland Cavaliers</option>
            <option value="Dallas Mavericks">Dallas Mavericks</option>
            <option value="Denver Nuggets">Denver Nuggets</option>
            <option value="Detroit Pistons">Detroit Pistons</option>
            <option value="Golden State Warriors">Golden State Warriors</option>
            <option value="Houston Rockets">Houston Rockets</option>
            <option value="Indiana Pacers">Indiana Pacers</option>
            <option value="Los Angeles Clippers">Los Angeles Clippers</option>
            <option value="Los Angeles Lakers">Los Angeles Lakers</option>
            <option value="Memphis Grizzlies">Memphis Grizzlies</option>
            <option value="Miami Heat">Miami Heat</option>
            <option value="Milwaukee Bucks">Milwaukee Bucks</option>
            <option value="Minnesota Timberwolves">Minnesota Timberwolves</option>
            <option value="New Orleans Pelicans">New Orleans Pelicans</option>
            <option value="New York Knicks">New York Knicks</option>
            <option value="Oklahoma City Thunder">Oklahoma City Thunder</option>
            <option value="Orlando Magic">Orlando Magic</option>
            <option value="Philadelphia 76ers">Philadelphia 76ers</option>
            <option value="Phoenix Suns">Phoenix Suns</option>
            <option value="Portland Trail Blazers">Portland Trail Blazers</option>
            <option value="Sacramento Kings">Sacramento Kings</option>
            <option value="San Antonio Spurs">San Antonio Spurs</option>
            <option value="Toronto Raptors">Toronto Raptors</option>
            <option value="Utah Jazz">Utah Jazz</option>
            <option value="Washington Wizards">Washington Wizards</option>
        </select>
        <input type="submit"/>
        </form>
    </div>
    
    <button onClick={clearSearch}>Clear Search</button>
    <div className="players-container">        
        {searchedPlayers}
    </div>
    </>
    )
}

export default Search