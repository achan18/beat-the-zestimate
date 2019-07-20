import React from 'react';
import { Redirect } from "react-router-dom";

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
            <div style={styles.SignWrapper}>

                {/* Sign Post */}
                <div style={styles.SignPostPart1}></div>
                <div style={styles.SignPostPart2}></div>
                <div style={styles.SignPostPart3}></div>
                <div style={styles.SignPostPart4}></div>
                <div style={styles.SignPostPart5}></div>
                <div style={styles.SignPostPart6}></div>

                {/* Top Sign */}
                <div style={styles.TopSign}>
                
                    {/* Sign Connector #1 */}
                    <div style={{width: '10px', position: 'absolute', left: '100px'}}>
                        <div style={{height: '8px', borderRadius: '0 0 100% 100%', width: '8px', margin: 'auto', backgroundColor: 'black'}}></div>
                        <div style={{height: '20px', margin: '-5px auto', width: '4px', backgroundColor: 'black'}}></div>
                        <div style={{height: '8px', borderRadius: '100%', width: '8px', margin: '-5px auto', backgroundColor: 'black'}}></div>
                    </div>

                    {/* Sign Connector #2 */}
                    <div style={{width: '10px', position: 'absolute', right: '100px'}}>
                        <div style={{height: '8px', borderRadius: '0 0 100% 100%', width: '8px', margin: 'auto', backgroundColor: 'black'}}></div>
                        <div style={{height: '20px', margin: '-5px auto', width: '4px', backgroundColor: 'black'}}></div>
                        <div style={{height: '8px', borderRadius: '100%', width: '8px', margin: '-5px auto', backgroundColor: 'black'}}></div>
                    </div>

                    {/* Sign Title */}
                    <div style={{ margin: '20px', padding: '10px', backgroundColor: 'rgb(228, 228, 228)', borderRadius: '5px', height: '80px', boxShadow: '-5px 6px 4px #00000012'}}>
                        <p style={{fontFamily: 'Bahianita, cursive', textAlign: 'center', width: '75%', fontWeight: 'bold', color: '#0c4499', fontSize: '48px', margin: '10px auto', letterSpacing: '2px'}}>
                        Your Score
                        </p>
                    </div>
                </div>

                {/* Lower Sign */}
                <div style={styles.LowerSign}>

                    {/* Sign Connector #1 */}
                    <div style={{width: '10px', position: 'absolute', left: '100px'}}>
                        <div style={{height: '8px', borderRadius: '0 0 100% 100%', width: '8px', margin: 'auto', backgroundColor: 'black'}}></div>
                        <div style={{height: '30px', margin: '-5px auto', width: '4px', backgroundColor: 'black'}}></div>
                        <div style={{height: '8px', borderRadius: '100%', width: '8px', margin: '-5px auto', backgroundColor: 'black'}}></div>
                    </div>

                    {/* Sign Connector #2 */}
                    <div style={{width: '10px', position: 'absolute', right: '100px'}}>
                        <div style={{height: '8px', borderRadius: '0 0 100% 100%', width: '8px', margin: 'auto', backgroundColor: 'black'}}></div>
                        <div style={{height: '30px', margin: '-5px auto', width: '4px', backgroundColor: 'black'}}></div>
                        <div style={{height: '8px', borderRadius: '100%', width: '8px', margin: '-5px auto', backgroundColor: 'black'}}></div>
                    </div>

                    {/* Input Box */}
                    <div style={styles.InputBoxWrapper}>
                        <p style={styles.Score}>{this.props.score}</p>
                    </div>
                </div>
            </div>
        );
      }
}

const styles = {

    SignWrapper: {
        display: 'grid',
        gridTemplateColumns: '30px 30px auto',
        gridTemplateRows: '30px 30px 120px auto',
        margin: '20px',
        minWidth: '350px'
    },

    SignPostPart1: {
        gridColumn: '2/3',
        backgroundColor: 'rgb(228, 228, 228)',
        borderRadius: '5px 5px 0 0',
        boxShadow: '-5px 6px 4px #00000012'
    },

    SignPostPart2: {
        gridColumn: '1/2',
        gridRow: '2/3',
        backgroundColor: 'rgb(228, 228, 228)',
        borderRadius: '5px 0 0 5px',
        boxShadow: '2px 6px 4px #00000012'
    },

    SignPostPart3: {
        gridColumn: '2/3',
        gridRow: '2/3',
        backgroundColor: 'rgb(228, 228, 228)',
        boxShadow: '2px 6px 4px #00000012'
    },

    SignPostPart4: {
        gridColumn: '3/4',
        gridRow: '2/3',
        backgroundColor: 'rgb(228, 228, 228)',
        borderRadius: '0 5px 5px 0',
        boxShadow: '2px 6px 4px #00000012'
    },

    SignPostPart5: {
        gridColumn: '2/3',
        gridRow: '3/4',
        backgroundColor: 'rgb(228, 228, 228)',
        height: 'auto',
        boxShadow: '-5px 6px 4px #00000012'
    },

    SignPostPart6: {
        gridColumn: '2/3',
        gridRow: '4/5',
        backgroundColor: 'rgb(228, 228, 228)',
        height: 'auto',
        boxShadow: '-5px 6px 4px #00000012'
    },

    TopSign: {
        gridArea: '3 / 3 / 4 / 4', 
        position: 'relative'
    },

    LowerSign: {
        gridColumn: '3/4', 
        gridRow: '4/5', 
        position: 'relative'
    },

    InputBoxWrapper: {
        margin: '30px',
        gridRow: '3/4',
        gridColumn: '3/4',
        padding: '10px',
        backgroundColor: 'rgb(228, 228, 228)',
        borderRadius: '5px',
        height: '50px',
        boxShadow: '-5px 6px 4px #00000012'
      },

      Score: {
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '8px auto'
      }
};