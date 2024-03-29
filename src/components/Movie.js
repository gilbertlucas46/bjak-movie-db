import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Overdrive from 'react-overdrive';

const MAX_LENGTH = 20;

const Movie = ({ movie }) => (
  <MoviesContainer>
    {movie.data.map((item) => {
      const imgPoster = item.images.find((poster) => poster.type === 'POSTER');
      return (
        <Cards key={item.id}>
          <Link to={`/${item.id}`}>
            <Overdrive id={item.id}>
              <Poster src={imgPoster.url} alt={item.title}/>
            </Overdrive>
            <h4>{`${item.title.substring(0, MAX_LENGTH)}`} {item.title.length > MAX_LENGTH && '...' }</h4>
          </Link>
        </Cards>
      );
    })}
  </MoviesContainer>
);
export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 30px #00000080;
  transition: all .2s ease-in-out;
  min-width: 200px;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Cards = styled.div`
  display: inline-block;
  padding: 0 .6rem;
  @media (min-width:992px) {
    max-width:200px;
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
