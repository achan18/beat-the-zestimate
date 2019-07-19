import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './SignIn.css'
import SignLogin from '../components/signLogin';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toGamePage: false,
            username: null
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
                <SignLogin />
            </div>
        )
    }
}