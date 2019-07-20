import React from 'react';
import { Link } from "react-router-dom";
import SignScore from '../components/signScore'
import './Result.css'
const axios = require('axios');

export default class Result extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            score: null,
            zestimate: null,
            salesPrice: null,
        }

        let parcelid = this.props.location.state.parcelid
        let zpid = this.props.location.state.zpid
        let username = this.props.location.state.username
        let guess = this.props.location.state.guess

        let params = {
            userZestimate: guess,
            parcelid: parcelid,
            zpid: zpid,
            userName: username
        }

        const URL =  `http://localhost:8080/results`;

        axios.get(URL, {params: params}).then((res) => {
            res = res.data
            console.log(res)
  
            this.setState(() => ({
              score: res.score,
              zestimate: res.zestimate,
              salesPrice: res.salesPrice,
            }))
          })
          .catch(function (error) {
            // handle error
            console.log(error)
          })

        console.log(this.props.location)
    }

    render() {
        return (
            <div>
                <div className="ScoreGrid">
                    {/* <p>Result Page</p> */}
                    <SignScore score={this.state.score}/>

                    {/* YOUR GUESS, ZESTIMATE, ACTUAL PRICE */}
                    <div>
                        <div className="PricesGrid">
                            <p className="PriceLabel">Your Guess: </p>
                            <p className="PriceValue">{this.props.location.state.guess}</p>
                            <p className="PriceLabel">Zestimate: </p>
                            <p className="PriceValue">{this.state.zestimate}</p>
                            <p className="PriceLabel">Actual Price: </p>
                            <p className="PriceValue">{this.state.salesPrice}</p>
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