import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";

export default class SearchBar extends React.Component {
  render () {
    const { searchMovies } = this.props;

    return (
      <SearchBarForm onChange={event => searchMovies(event)} >
        <SearchBarInput name="keyword" type="text" placeholder="Search for movies"/>
        <SearchBarInput name="year" type="number" maxLength="4" placeholder="Year of release"/>
      </SearchBarForm>
    )
  }
}

const SearchBarForm = styled.form`
  display: flex;
  flex-direction: column;
`

const SearchBarInput = styled.input`
  color: ${colors.primaryColor};
  border: none;
  border-bottom: 2px solid ${colors.primaryColor};
  padding: 15px 0;
  font-weight: 800;

  &::placeholder {
    color: ${colors.primaryColor};
    opacity: 0.35;
  }

  &:focus-visible {
    outline: none;
  }

  &:not(:first-child) {
    padding-top: 30px;
  }
`