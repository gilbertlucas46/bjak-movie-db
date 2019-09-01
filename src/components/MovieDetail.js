import React, { Component } from 'react';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    metadata: {},
    poster: '',
    background: '',
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`);
      const movie = await res.json();
      const poster = movie.data.images.map((items) => (items)).filter((img) => img.type === 'POSTER').map((a) => (a.url));
      const background = movie.data.images.map((items) => (items)).filter((img) => img.type === 'BACKGROUND').map((a) => (a.url));
      this.setState({
        movie: movie.data,
        metadata: movie.data.meta,
        poster,
        background,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie, metadata, poster, background } = this.state;

    return (
      <div>
        <img src={background} alt={movie.title}/>
        <img src={poster} alt={movie.title}/>
        <h1>{movie.title}</h1>
        <h3>Released date:{metadata.releaseYear}</h3>
        <p>{movie.description}</p>
      </div>
    );
  }
}
