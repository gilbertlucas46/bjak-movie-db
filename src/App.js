import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';

import Movie from './Movie';

export default class App extends Component {

  state = {
    movies: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20');
      const movies = await res.json();
      // console.log(movies);
      this.setState({
        movies: movies.data
      })
    } catch(e) {
        console.log(e)
    }
  }
  render() {
    const multiTitleManualCuration = this.state.movies.filter(movie => movie.type === 'Multi-Title-Manual-Curation');
    console.log(multiTitleManualCuration)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {multiTitleManualCuration.map(movie => <Movie key={movie.row_id} movie={movie}/>)}
      </div>
    )
  }
}
