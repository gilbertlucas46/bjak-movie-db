import React from 'react';
import PropTypes from 'prop-types';
import Cards from './ui/Cards';

const Movie = ({ movie }) => (
  <div>
    <h1 key={movie.row_id}>{movie.row_name}</h1>
    <Cards>
      {movie.data.map((item) => {
        const Poster = item.images.find((poster) => poster.type === 'POSTER');
        return (
          <div key={item.id}>
            <img src={Poster.url} alt=""/>
            <h4>{item.title}</h4>
          </div>
        );
      })}
    </Cards>
  </div>
);
export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    row_name: PropTypes.string.isRequired,
  }).isRequired,
};
