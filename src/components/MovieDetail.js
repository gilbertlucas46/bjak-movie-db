import React, { Component } from 'react';

export default class MovieDetail extends Component {
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
    // const { movies } = this.state;
    // const multiTitleManualCuration = movies.filter((movie) => movie.type === 'Multi-Title-Manual-Curation');
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}
