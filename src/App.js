import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Movie from './Movie';

export default class App extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20');
      const movies = await res.json();
      this.setState({
        movies: movies.data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies } = this.state;
    const multiTitleManualCuration = movies.filter((movie) => movie.type === 'Multi-Title-Manual-Curation');
    console.log(multiTitleManualCuration);
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {multiTitleManualCuration.map((movie) => <Movie key={movie.row_id} movie={movie}/>)}
        </div>
      </Router>
    );
  }
}
