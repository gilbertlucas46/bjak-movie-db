import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Movie = ({ movie }) => (
  <MoviesContainer>
    {movie.data.map((item) => {
      const imgPoster = item.images.find((poster) => poster.type === 'POSTER');
      return (
        <Cards key={item.id}>
          <Link to={`/${item.id}`}>
            <Poster src={imgPoster.url} alt={item.title}/>
            <h4>{item.title}</h4>
          </Link>
        </Cards>
      );
    })}
  </MoviesContainer>
);
export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    row_name: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 30px #00000080;
  transition: all .2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Cards = styled.div`
  display: inline-block;
  padding: 0 .6rem;
  @media (min-width:992px) {
    max-width:250px;
    img {
      width:100%;
    }
  }
  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: orange;
    }
  }
`;

export const MoviesContainer = styled.div`
  white-space:nowrap;
  overflow: auto;
  position: relative;
  padding-top: 1.5rem;
`;
