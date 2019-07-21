import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from './Game/Game'
import Result from './Result/Result'
import SignIn from './SignIn/SignIn';
import './App.css'
import Leaderboard from './Leaderboard/Leaderboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={SignIn} />
        <Route path="/game/" exact component={Game} />
        <Route path="/result/" component={Result} />
        <Route path="/leaderboard/" component={Leaderboard} />
    </Router>
    </div>
  );
}

export default App;