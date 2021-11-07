import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";

export default class MovieItem extends React.Component {

  render () {
    const { movie, genres } = this.props;
    return (
      // Complete the MovieItem component
      <MovieItemWrapper key={movie.id}>
        <LeftCont>
          <img src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2/${movie.poster_path}`}/>
        </LeftCont>
        <RightCont>
          <TitleContainer>
            <h2>{movie.title}</h2>
            <RateTag>{movie.vote_average.toFixed(1)}</RateTag>
          </TitleContainer>
          <GenresContainer>
            {movie.genre_ids.map(genre_id => {
              return <GenresContent>{genres.length && genres.find(genre => genre.id === genre_id).name}</GenresContent>
            })}
          </GenresContainer>
          <p>{movie.overview}</p>
          <ReleaseDateText>{movie.release_date}</ReleaseDateText>
        </RightCont>
      </MovieItemWrapper>
    )
  }
}

const MovieItemWrapper = styled.div`
  display: flex;
  position: relative;
  background-color: white;
  border-radius: 3px;
  margin-top: 15px;
  padding: 20px;
`

const LeftCont = styled.div`
  display: inline-block;
  padding-right: 20px;
`

const RightCont = styled.div`
  display: inline-block;
  width: -webkit-fill-available;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RateTag = styled.div`
  width: fit-content;
  border-radius: 5px;
  padding: 5px;
  background-color: ${colors.primaryColor};
  color: white;
  font-weight: 800;
  line-height: 1;
`

const GenresContainer = styled.div`
  display: flex;
`

const GenresContent = styled.div`
  display: flex;
  color: ${colors.primaryColor};
  line-height: 1;
  font-size: 14px;
  font-weight: 800;

  &:not(:first-child) {
    padding-left: 10px;
  }

  &:not(:last-child) {
    padding-right: 10px;
    border-right: 2px solid ${colors.primaryColor};
  }
`

const ReleaseDateText = styled.div`
  color: ${colors.primaryColor};
  opacity: 0.5;
`