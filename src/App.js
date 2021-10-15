// import React,{useState} from 'react';
import Clicker from './components/Clicker';
import Header from './components/Header';
import Reaction from './components/Reaction';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/clicker">
            <Clicker />
          </Route>
          <Route exact path="/reaction">
            <Reaction />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
