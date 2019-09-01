import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import LoadingSpinner from './ui/LoadingSpinner';

export default class MoviesList extends Component {
  state = {
    movies: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20');
      const movies = await res.json();
      this.setState({
        movies: movies.data,
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies, loading } = this.state;
    const multiTitleManualCuration = movies.filter((movie) => movie.type === 'Multi-Title-Manual-Curation');
    return (
      <div>
        {multiTitleManualCuration.map((movie) => (
          <div key={movie.row_id}>
            {loading ? <LoadingSpinner/> : <Movie movie={movie}/>}
          </div >
        ))}
      </div>
    );
  }
}

const MovieGrid =  styled.div`

`;