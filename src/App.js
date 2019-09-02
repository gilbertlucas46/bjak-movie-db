import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './components/scss/App.scss';

import MoviesList from './components/MoviesList';
import MovieDetail from './components/MovieDetail';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route exact path="/:id" component={MovieDetail} />
      </Switch>
    </div>
  </Router>
);

export default App;
