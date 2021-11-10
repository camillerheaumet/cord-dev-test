import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import FilterIcon from "../../images/filter-icon.png";

export default class SearchBar extends React.Component {
  render () {
    const { searchMovies, handleMobileExpandableFilter } = this.props;

    return (
      <SearchBarForm onChange={event => searchMovies(event)} >
        <SearchBarInput className="search_input" name="keyword" type="text" placeholder="Search for movies"/>
        <img className="search_img mobile_only_input" src={FilterIcon} alt="Search icon" onClick={() => handleMobileExpandableFilter()}/>
        <SearchBarInput className="search_input" name="year" type="number" maxLength="4" placeholder="Year of release"/>
      </SearchBarForm>
    )
  }
}

const SearchBarForm = styled.form`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 1023px){
    flex-direction: row;
  }
`

const SearchBarInput = styled.input`
  flex: 1;
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