import React from "react";
import styled from 'styled-components';

import MovieItem from '../movieitem';

export default class MovieList extends React.Component {

  render () {
    const { movies, genres } = this.props;

    return (
      <MoviesWrapper>
        {movies.map((movie, index) => <MovieItem key={movie.id} movie={movie} genres={genres}></MovieItem>)}
      </MoviesWrapper>
    )
  }
}

const MoviesWrapper = styled.div`
  position: relative;
`