import React from 'react';
const axios = require('axios');

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        let parcelid = this.props.location.state ? this.props.location.state.parcelid : null

        const URL =  `http://localhost:8080/leaderboard?parcelid=${parcelid}`;
        // const URL =  `http://172.30.100.143:8080/leaderboard?parcelid=${parcelid}`;

        this.state = {
            scores: []
        }

        axios.get(URL).then((res) => {
            res = res.data
            console.log(res)
  
            this.setState(() => ({
                scores: res ? res.scores : null
            }))
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })
    }

    render() {
        return (
            <div className="LeaderboardContainer">

                <h1 className="LeaderboardTitle">
                        Leaderboard
                </h1>
                <div className="LeaderboardGrid">
                    <i className="LeaderboardLabel">Name</i>
                    <i className="LeaderboardLabel">Guess</i>
                    <i className="LeaderboardLabel">Score</i>
                </div>

                {
                    this.state.scores.map((score) => (
                        <div className="LeaderboardGrid" key={score}>
                            <p className="LeaderboardName">{score.name}</p>
                            <p className="LeaderboardScore">{score.userZestimate}</p>
                            <p className="LeaderboardScore">{Math.floor(score.score)}</p>
                        </div>
                    ))
                }

            </div>
        )
    }
}