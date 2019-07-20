import React from 'react';
import { Redirect } from "react-router-dom";
import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toGamePage: false,
            username: null
        }
    }

    goToGameScreen = () => {
        if (this.state.username) {
            this.setState(() => ({
                toGamePage: true
            }))
        }
    }

    render() {
        if (this.state.toGamePage) {
            return <Redirect to={{
                pathname: '/game',
                state: { username: this.state.username }
            }} />
        }

        return (
            <div className="LoginContainer">
                <div className="InputBoxWrapper">
                    <FontAwesomeIcon 
                        color="white" 
                        icon={faHome} 
                        size="3x"
                        className="HouseIcon"
                    />
                    <p className="Title">
                        Beat the Zestimate!
                    </p>

                    <input 
                        className="UsernameInput" 
                        placeholder="Enter your username"
                        onChange={input => this.setState({username: input.target.value})}
                    />

                    <button 
                        disabled={!this.state.username}
                        className="LoginBtn"
                        onClick={this.goToGameScreen}
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        )
    }
}