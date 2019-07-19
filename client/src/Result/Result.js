import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignScore from '../components/signScore'
import './Result.css'

export default class Result extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.location)
    }

    render() {
        return (
            <div>
                <div className="ScoreGrid">
                    {/* <p>Result Page</p> */}
                    <SignScore />

                    {/* YOUR GUESS, ZESTIMATE, ACTUAL PRICE */}
                    <div>
                        <div className="PricesGrid">
                            <p className="PriceLabel">Your Guess: </p>
                            <p className="PriceValue">{this.props.location.state.guess}</p>
                            <p className="PriceLabel">Zestimate: </p>
                            <p className="PriceValue">$405,9000</p>
                            <p className="PriceLabel">Actual Price: </p>
                            <p className="PriceValue">$405,9000</p>
                        </div>
                        <Link to="/">
                            <button className="PlayAgainBtn">
                                PLAY AGAIN
                            </button>
                        </Link>
                    </div>
                </div>
                <hr style={{margin: '50px'}}/>
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