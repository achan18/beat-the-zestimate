import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from './Game/Game'
import Result from './Game/Result'

function App() {
  return (
    <Router>
        <Route path="/" exact component={Game} />
        <Route path="/result/" component={Result} />
    </Router>
  );
}

export default App;