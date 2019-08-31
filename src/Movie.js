import React from 'react';
import PropTypes from 'prop-types';
import Cards from './components/Cards';

const Curations;

const Movie = ({ movie }) => {
  // console.log(movie)
  return (
    <Curations>
      <h1 key={movie.row_id}>{movie.row_name}</h1>
      <Cards>
        {movie.data.map(item => {
          return (
            <div key={item.id}>
              <h4>{item.title}</h4>
            </div>
          )
        })}
      </Cards>
    </Curations>
  )
};

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    row_name: PropTypes.string.isRequired,
  }).isRequired,
};
