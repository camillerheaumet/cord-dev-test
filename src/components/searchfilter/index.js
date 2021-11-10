import React from "react";
import styled, { css } from 'styled-components';

import * as colors from "../../colors";
import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";

export default class SearchFilters extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  handleMobileExpandableFilter = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  render () {
    const { isOpen } = this.state;
    const { genres, ratings, languages, selectedGenres, selectedRating, selectedLanguage, searchMovies, handleCheckboxClicked } = this.props;

    return (
      <FiltersWrapper>
        <SearchFiltersCont className="search_inputs_cont" marginBottom>
          <SearchBar searchMovies={searchMovies} handleMobileExpandableFilter={this.handleMobileExpandableFilter} />
        </SearchFiltersCont>
        <SearchFiltersCont className={isOpen ? 'visible' : ''}>
          <CategoryTitle>Movies</CategoryTitle>
          <ExpandableFilter
            title="Select genre(s)"
            checkboxes={genres}
            selection={selectedGenres}
            handleCheckboxClicked={handleCheckboxClicked}
            type="genres"
          />
          <ExpandableFilter
            title="Select rating"
            checkboxes={ratings}
            selection={selectedRating}
            handleCheckboxClicked={handleCheckboxClicked}
            type="ratings"
          />
          <ExpandableFilter
            title="Select language"
            checkboxes={languages}
            selection={selectedLanguage}
            handleCheckboxClicked={handleCheckboxClicked}
            type="languages"
          />
        </SearchFiltersCont>
      </FiltersWrapper>
    )
  }
}

const FiltersWrapper = styled.div`
  position: relative;
`

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all .3s ease-in-out;
  
  ${props => props.marginBottom && css`
    margin-bottom: 15px;
  `}

  @media only screen and (max-width: 1023px){
    background-color: transparent;
    margin-top: 15px;
    padding: 0px;

    &:last-child {
      display: none;
  
      &.visible {
        display: block;
      }
    }
  }
`

const CategoryTitle = styled.div`

`