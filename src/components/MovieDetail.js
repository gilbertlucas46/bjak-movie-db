import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    metadata: {},
    poster: '',
    background: '',
    spotlight: '',
  }

  async componentDidMount() {
    const { match } = this.props;
    try {
      const res = await fetch(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${match.params.id}`);
      const movie = await res.json();
      const poster = movie.data.images.map((items) => (items)).filter((img) => img.type === 'POSTER').map((a) => (a.url));
      const background = movie.data.images.map((items) => (items)).filter((img) => img.type === 'BACKGROUND').map((a) => (a.url));
      const spotlight = movie.data.images.map((items) => (items)).filter((img) => img.type === 'SPOTLIGHT').map((a) => (a.url)).toString();
      this.setState({
        movie: movie.data,
        metadata: movie.data.meta,
        poster,
        background,
        spotlight,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie, metadata, poster, spotlight, background } = this.state;
    const getImgUrl = () => {
      if (!(spotlight)) {
        return background;
      }
      return spotlight;
    };

    return (
      <MovieWrapper backdrop={getImgUrl}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={poster} alt={movie.title}/>
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>Released date:{metadata.releaseYear}</h3>
            <hr></hr>
            <p>
              <strong>Languages: </strong>
              {Array.of(movie.languages).reduce((id, lang) => id.concat(lang), '').split(',').join(', ')}
            </p>
            <p>{movie.description}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  background: url(${(props) => props.backdrop}) no-repeat;
  background-size: contain;
  @media (min-width:992px) {
    padding-top: 50vh; 
  }
  @media (max-width:991px) {
    padding-top: 20vh; 
  }
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  p {
    span {
      padding: 0 2px;
    }
  }
  img {
    &:hover {
      transform: unset;
    }
  }
  @media (min-width:992px) {
    display: flex; 
  }
  > div {
    @media (min-width:992px) {
      margin-left: 20px;
    }
    @media (max-width:991px) {
      margin-left: 0; 
      top: -5rem;
    }
  }
  img {
    position: relative;
    top: -5rem;
    @media (max-width:991px) {
      margin: 0; 
    }
  }
`;
