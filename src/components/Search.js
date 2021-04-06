import React, { useState } from 'react'

function Search() {
    const [search, setSearch] = useState("")

    function handleSearch(e){
        e.preventDefault()
        fetch(`http://localhost:3000/player/${search}`)
        .then(r => r.json())
        .then(console.log)
    }

    function handleChange(e){
        setSearch(e.target.value)
    }

    return (
    <div className="Search">
        <h1> Welcome </h1>
            <label> Search for Player </label>
            <form onSubmit={handleSearch}>
            <input 
                type="text"
                value={search}
                onChange={handleChange}
            />
            <input
                type="submit"
            />
        </form>
    </div>
    )
}

export default Search