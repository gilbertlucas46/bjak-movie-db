import React, { Component } from 'react';
import styled from 'styled-components';
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
    try {
      const res = await fetch(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`);
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
          <Poster src={poster} alt={movie.title}/>
          <div>
            <h1>{movie.title}</h1>
            <h3>Released date:{metadata.releaseYear}</h3>
            <p>{movie.description}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${(props) => props.backdrop}) no-repeat;
  background-size: contain;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  @media (min-width: 992px) {
    display: flex; 
  }
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
