import React from 'react'

export default function Game(game) {
    const {scores, teams, time, status} = game.game

    const newTime = time.split(':')

    var hours = Number(time[0])
    var minutes = Number(time[1])

    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
    } else if (hours > 12) {
        timeValue= "" + (hours - 12);
    } else if (hours == 0) {
        timeValue= "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes
    timeValue += (hours >= 12) ? " A.M." : " P.M."


    return (
        <div className="game-feed">
            <hr/>
            <h6> <strong> Start Time </strong> {timeValue} EST </h6>
            <h6> {status.long} </h6>
            <img 
            src={teams.away.logo} 
            alt="away logo" 
            style={{maxHeight: "50px", maxWidth: "75px", height: "auto", width: "auto"}}
            />
            {teams.away.name}
            {" "}- {scores.away ? 0 : scores.away.total}
            <br/>
            <img 
            src={teams.home.logo} 
            alt="home logo" 
            style={{maxHeight: "50px", maxWidth: "75px", height: "auto", width: "auto"}}
            /> 
            {teams.home.name}
            {" "}- {scores.home ? 0 : scores.home.total}
        </div>
    )
}
