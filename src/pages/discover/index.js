import React from "react";
import styled from 'styled-components';

import * as colors from "../../colors";
import API from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

export default class Discover extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      keyword: '',
      year: 0,
      results: [],
      totalCount: 0,
      genreOptions: [],
      ratingOptions: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 }
      ],
      languageOptions: [
        { id: 'FR', name: 'French' },
        { id: 'EL', name: 'Greek' },
        { id: 'EN', name: 'English' },
        { id: 'RU', name: 'Russian' },
        { id: 'PO', name: 'Polish' }
      ],
      selectedGenres: [],
      selectedRating: {},
      selectedLanguage: {}
    };
  }

  componentDidMount() {
    this.getDiscover();
    this.getGenres();
  }

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
  async getDiscover(genres, rating, language) {
    await API.getDiscover(genres, rating, language)
    .then(data => {
      if (data.results.length > 0) {
        this.setState({ results: data.results, totalCount: data.results.length })
      } else if (data.errors) {
        this.alertFunc('There is an error/ change this message')
      }
    })
  }

  async getGenres() {
    await API.getGenres()
    .then(data => {
      if (data.genres.length > 0) {
        this.setState({ genreOptions: data.genres })
      } else if (data.errors) {
        this.alertFunc('There is an error on genres/ change this message')
      }
    })
  }

  async getSearchResultsKeyword(keyword, year, genres, rating, language) {
    await API.getSearchResults(keyword, year, genres, rating, language)
    .then(data => {
      console.log(data.results)
      if (data.results.length > 0) {
        this.setState({ results: data.results, totalCount: data.results.length })
      } else if (data.errors) {
        this.alertFunc('There is an error/ change this message')
      }
    })
  }

  searchMovies(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [name]: value
    }, function () {
    if (this.state.keyword.length > 0) {
      this.getSearchResultsKeyword(this.state.keyword, this.state.year, this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    } else {
      this.getDiscover(this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    }
  })
  }

  handleCheckboxClicked = (obj, type, checked) => {
    if (type === 'genres') {
      this.setState({ selectedGenres: (checked ? [...this.state.selectedGenres, obj] : this.state.selectedGenres.filter(genre => genre.id !== obj.id)) }, function () {
    if (this.state.keyword.length > 0) {
      this.getSearchResultsKeyword(this.state.keyword, this.state.year, this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    } else {
      this.getDiscover(this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    }
  })
    } else {
      const stateName = type === 'ratings' ? 'selectedRating' : 'selectedLanguage';
      this.setState({ [stateName]: (checked ? obj : {}) }, function () {
    if (this.state.keyword.length > 0) {
      this.getSearchResultsKeyword(this.state.keyword, this.state.year, this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    } else {
      this.getDiscover(this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    }
  })
    }
  }

  getSearchResults(keyword, year, genres, rating, language) {
    if (keyword.length > 0) {
      this.getSearchResultsKeyword(this.state.keyword, this.state.year, this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    } else {
      this.getDiscover(this.state.selectedGenres, this.state.selectedRating, this.state.selectedLanguage);
    }
  }

  render () {
    const { genreOptions, languageOptions, ratingOptions, selectedGenres, selectedRating, selectedLanguage, totalCount, results } = this.state;

    return (
      <DiscoverWrapper>
        <MobilePageTitle className="mobile_only_input">Discover</MobilePageTitle>
        <MovieFilters>
          <SearchFilters 
            genres={genreOptions} 
            ratings={ratingOptions}  
            languages={languageOptions}
            selectedGenres={selectedGenres}
            selectedRating={selectedRating}
            selectedLanguage={selectedLanguage}
            searchMovies={event => this.searchMovies(event)}
            handleCheckboxClicked={this.handleCheckboxClicked}
          />
        </MovieFilters>
        <MovieResults>
          { totalCount > 0 && <TotalCounter>{totalCount} {totalCount > 1 ? 'results' : 'result'}</TotalCounter>}
          <MovieList 
            movies={results || []}
            genres={genreOptions || []}
          />
        </MovieResults>
      </DiscoverWrapper>
    )
  }
}

const DiscoverWrapper = styled.main`
  padding: 30px 15px;

  @media only screen and (min-width: 1024px){
    display: flex;
    flex-direction: row-reverse;
    padding: 60px 35px;
  }
`

const TotalCounter = styled.div`
  font-weight: 900;
`

const MovieResults = styled.div`
  @media only screen and (min-width: 1024px){
    width: 75%;
  }
`

const MovieFilters = styled.div`
  @media only screen and (min-width: 1024px){
    width: 25%;
    margin: 35px 0 0 15px;
  }

`

const MobilePageTitle = styled.header`
  font-size: 25px;
  font-weight: 800;
  padding-left: 50px;
`