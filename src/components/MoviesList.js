import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import LoadingSpinner from './ui/LoadingSpinner';
import Buttons from './ui/Buttons';

export default class MoviesList extends Component {
  state = {
    movies: [],
    loading: true,
    totalPages: null,
    perPage: null,
    page: 1,
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }


  makeHttpRequestWithPage = async (pageNumber) => {
    const res = await fetch(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${pageNumber}&perPage=20`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const movies = await res.json();

    this.setState({
      movies: movies.data,
      loading: false,
      totalPages: movies.pagination.totalPages,
      perPage: movies.pagination.perPage,
      page: movies.pagination.page,
    });
  }


  render() {
    const { movies, loading, totalPages, page } = this.state;
    let renderPageNumbers;
    const multiTitleManualCuration = movies.filter((movie) => movie.type === 'Multi-Title-Manual-Curation');

    // Pagination
    const pageNumbers = [];
    if (totalPages !== null) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      renderPageNumbers = pageNumbers.map((number) => {
        const classes = page === number ? 'active' : '';
        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}><Buttons>{number}</Buttons></span>
        );
      });
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
          {renderPageNumbers}
        </Pagination>
      </>
    );
  }
}

const Pagination = styled.div`
  span {
    display: inline-block;
    padding: 2px;
    margin: 4rem .4rem;
    background-color: #fff;
    width: 42px;
    height:42px;
    text-align: center;
    line-height: 38px;
    color: gray;
    &.active {
      background-color: black;
      transform: scale(1.1);
      Button {
        font-weight: bold;
        color:white;
        width:100%;
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
