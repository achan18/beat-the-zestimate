import React from 'react';
const axios = require('axios');

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        const URL =  `http://localhost:8080/leaderboard`;

        axios.get(URL).then((res) => {
            res = res.data
            console.log(res)
  
            // this.setState(() => ({
            // }))
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
                    <i className="LeaderboardLabel">Score</i>

                    <p className="LeaderboardName">Kevin</p>
                    <p className="LeaderboardScore">20,000</p>
                    <p className="LeaderboardName">Susan</p>
                    <p className="LeaderboardScore">17,500</p>
                    <p className="LeaderboardName">Amelie</p>
                    <p className="LeaderboardScore">12,500</p>
                </div>

            </div>
        )
    }
}