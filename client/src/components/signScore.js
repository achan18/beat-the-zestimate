import React from 'react';
import { Redirect } from "react-router-dom";
import './sign.css'

export default class SignScore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toResultPage: false,
            guess: null
        }
    }

    getScore = () => {
        console.log(this.state.guess)

        this.setState(() => ({
            toResultPage: true
        }))
    }

    render() {
        if (this.state.toResultPage) {
            return <Redirect to='/result' />
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
                        <h2 className="title score-title">
                        Your Score
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
                    <div className="score-wrapper">
                        <p className="score-value">
                            {this.props.score}
                        </p>
                    </div>
                </div>
            </div>
        );
      }
}