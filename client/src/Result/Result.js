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
            salePrice: null,
            guess: this.props.location.state ? this.props.location.state.guess : null
        }

        if (!this.props.location.state) return
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
              score: Math.floor(res.score),
              zestimate: this.formatToCurrency(res.zestimate),
              salePrice: this.formatToCurrency(res.salePrice),
            }))
          })
          .catch(function (error) {
            console.log(error)
          })
    }

    formatToCurrency = (value) => {
        if (typeof value == 'string') {
            value = parseInt(value, 10)
        }
        var num = '$' + value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return num
    }

    render() {
        return (
            <div className="GameContainer">
                
                <div className="SignAndMapImageGrid">

                {/* SIGN / INPUT BOX */}
                <SignScore score={this.state.score}/>

                {/* PROPERTY INFO */}
                <div>
                    <div>
                        <div className="PricesGrid">
                            <p className="PriceLabel">Your Guess: </p>
                            <p className="PriceValue">{this.state.guess}</p>
                            <p className="PriceLabel">Zestimate: </p>
                            <p className="PriceValue">{this.state.zestimate}</p>
                            <p className="PriceLabel">Actual Price: </p>
                            <p className="PriceValue">{this.state.salePrice}</p>
                        </div>
                        <Link to="/leaderboard">
                            <button className="PlayAgainBtn">
                                See Leaderboard
                            </button>
                        </Link>
                    </div>
                </div>

                </div>

                <hr style={{margin: '45px'}} />

                {/* <h1 className="LeaderboardTitle">
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
                </div> */}

            </div>
        )
    }
}