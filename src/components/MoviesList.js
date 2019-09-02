import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import LoadingSpinner from './ui/LoadingSpinner';
import Buttons from './ui/Buttons';

export default class MoviesList extends Component {
  state = {
    movies: [],
    loading: true,
    pagination: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${this.state.currentPage}&perPage=20`);
      const movies = await res.json();
      this.setState({
        movies: movies.data,
        loading: false,
        pagination: movies.pagination,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies, loading, pagination } = this.state;
    const multiTitleManualCuration = movies.filter((movie) => movie.type === 'Multi-Title-Manual-Curation');

    // Pagination
    const currentPage = pagination.page;
    const totalPages = [];

    for (let i = 1; i <= pagination.totalPages; i++) {
      totalPages.push(i);
    }


    return (
      <>
        {multiTitleManualCuration.map((movie) => (
          <MovieGrid key={movie.row_id}>
            <h1>{movie.row_name}</h1>
            <div>
              { loading ? <LoadingSpinner/> : <Movie movie={movie}/> }
            </div>
          </MovieGrid>
        ))}
        <Pagination>
          {totalPages.map((num) => (
            <li className={currentPage === num ? 'active' : ''}>
              <Buttons>{num}</Buttons>
            </li>
          ))}
        </Pagination>
      </>
    );
  }
}

const Pagination = styled.ul`
  li {
    display: inline-block;
    padding: 2px;
    margin: 4rem .4rem;
    background-color: #fff;
    width: 42px;
    height:42px;
    text-align: center;
    line-height: 38px;
    button {
      color: gray;
      text-decoration:none;
      display:inline-block;
      width: 100%;
      &:hover {
        cursor: pointer;
      }
    }
    &.active {
      background-color: black;
      transform: scale(1.1);
      button {
        font-weight: bold;
        color: white;
      }
    }
  }
`;

const MovieGrid = styled.div`
  padding-top: 2rem;
  &:hover {
    h1 {
      color: white;
    }
  }
  h1 {
    color: #c3c5c8;
  }
`;
