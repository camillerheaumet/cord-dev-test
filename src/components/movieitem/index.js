import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";

export default class MovieItem extends React.Component {

  render () {
    const { movie, genres } = this.props;
    return (
      // Complete the MovieItem component
      <MovieItemWrapper>
        <LeftCont>
          <img width="100%" src={`https://www.themoviedb.org/t/p/w188_and_h282_bestv2/${movie.poster_path}`} alt={movie.title}/>
        </LeftCont>
        <RightCont>
          <TitleContainer>
            <h2>{movie.title}</h2>
            <RateTag>{movie.vote_average.toFixed(1)}</RateTag>
          </TitleContainer>
          <GenresContainer>
            {movie.genre_ids.map((genre_id, index) => {
              return <GenresContent key={index}>{genres.length && genres.find(genre => genre.id === genre_id).name}</GenresContent>
            })}
          </GenresContainer>
          <OverviewContainer>
            <p>{movie.overview}</p>
          </OverviewContainer>
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

  @media only screen and (max-width: 1023px){
    padding: 15px;
  }
`

const LeftCont = styled.div`
  display: inline-block;
  margin-right: 20px;

  @media only screen and (max-width: 1023px){
    width: 30%;
    margin-right: 10px;
  }
`

const RightCont = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;

  @media only screen and (max-width: 1023px){
    width: 70%;
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1023px){
    align-items: flex-start;
  }

  h2{
    margin-top: 0;
    @media only screen and (max-width: 1023px){
      font-size: 14px;
    }
  }
`

const RateTag = styled.div`
  width: fit-content;
  border-radius: 5px;
  padding: 5px;
  background-color: ${colors.primaryColor};
  color: ${colors.lightBackground};
  font-weight: 800;
  line-height: 1;

  @media only screen and (max-width: 1023px){
    font-size: 10px;
  }
`

const GenresContainer = styled.div`
  display: flex;
`

const GenresContent = styled.div`
  display: flex;
  color: ${colors.primaryColor};
  line-height: 1;
  font-size: 12px;
  font-weight: 800;

  &:not(:first-child) {
    padding-left: 10px;
  }

  &:not(:last-child) {
    padding-right: 10px;
    border-right: 2px solid ${colors.primaryColor};
  }

  @media only screen and (max-width: 1023px){
    font-size: 8px;
  }
`

const ReleaseDateText = styled.div`
  color: ${colors.primaryColor};
  opacity: 0.5;
  margin-top: auto;

  @media only screen and (max-width: 1023px){
    font-size: 8px;
  }
`

const OverviewContainer = styled.div`
  @media only screen and (max-width: 1023px){
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    
    &:after {
      content: "";
      text-align: right;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 70%;
      height: 12px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 75%);
    }
    p {
      font-size: 10px;
    }
  }
`
