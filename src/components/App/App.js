import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import GardenContainer from '../GardenContainer/GardenContainer';
import PlanContainer from '../PlanContainer/PlanContainer';
import SeedListContainer from '../SeedListContainer/SeedListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>TimeGarden</h1>
          <ul>
            <Link to="/">Garden</Link>
            <Link to="/plan">Garden Plan</Link>
            <Link to="/seedlist">Seed Inventory</Link>
          </ul>
          <Route exact path='/' component={GardenContainer} />{/*exact path needed because otherwise the slashes will all match the home route*/}
          <Route path='/plan' component={PlanContainer} />
          <Route path='/seedlist' component={SeedListContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
