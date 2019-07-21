import React from 'react';
import NumberFormat from 'react-number-format';
import { Redirect } from "react-router-dom";
import './sign.css'

export default class SignSubmit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toResultPage: false,
            guess: null
        }
    }

    getScore = () => {
        if (!this.state.guess) {
            return
        }

        this.setState(() => ({
            toResultPage: true
        }))
    }

    render() {
        if (this.state.toResultPage) {
            return <Redirect to={{
                pathname: '/result',
                state: { 
                    guess: this.state.guess,
                    parcelid: this.props.parcelid,
                    username: this.props.username,
                    zpid: this.props.zpid,
                }
            }} />
        }

        return (
            <div className="sign-wrapper">

                {/* Sign Post */}
                <div className="sign-post sign-post-part-1"></div>
                <div className="sign-post sign-post-part-2"></div>
                <div className="sign-post sign-post-part-3"></div>
                <div className="sign-post sign-post-part-4"></div>
                <div className="sign-post sign-post-part-5"></div>
                <div className="sign-post sign-post-part-6"></div>

                {/* Top Sign */}
                <div className="top-sign">
                
                    {/* Sign Connector #1 */}
                    <div className="left-sign-connector-wrapper">
                        <div className="sign-connector connector upper-connector"></div>
                        <div className="sign-connector chain upper-chain"></div>
                        <div className="sign-connector connector lower-connector"></div>
                    </div>

                    {/* Sign Connector #2 */}
                    <div className="right-sign-connector-wrapper">
                        <div className="sign-connector connector upper-connector"></div>
                        <div className="sign-connector chain upper-chain"></div>
                        <div className="sign-connector connector lower-connector"></div>
                    </div>

                    {/* Sign Title */}
                    <div className="sign-title-wrapper">
                        <h2 className="title">
                        Beat the Zestimate!
                        </h2>
                    </div>
                </div>

                {/* Lower Sign */}
                <div className="lower-sign">

                    {/* Sign Connector #1 */}
                    <div className="left-sign-connector-wrapper">
                        <div className="sign-connector connector upper-connector"></div>
                        <div className="sign-connector chain lower-chain"></div>
                        <div className="sign-connector connector lower-connector"></div>
                    </div>

                    {/* Sign Connector #2 */}
                    <div className="right-sign-connector-wrapper">
                        <div className="sign-connector connector upper-connector"></div>
                        <div className="sign-connector chain lower-chain"></div>
                        <div className="sign-connector connector lower-connector"></div>
                    </div>

                    {/* Input Box */}
                    <div className="input-box-wrapper">
                        <NumberFormat 
                            className="input-box"
                            thousandSeparator={true} 
                            prefix={'$'}
                            placeholder="Enter your guess here"
                            onChange={input => this.setState({guess: input.target.value})}
                        />
                        <button 
                            className="submit-btn"
                            disabled={!this.state.guess}
                            onClick={this.getScore}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
            </div>
        );
      }
}