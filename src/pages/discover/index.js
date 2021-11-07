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
        { id: 'GR', name: 'Greek' },
        { id: 'EN', name: 'English' },
        { id: 'RU', name: 'Russian' },
        { id: 'PO', name: 'Polish' }
      ]
    };
  }

  componentDidMount() {
    this.getDiscover();
    this.getGenres();
  }

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
  async getDiscover() {
    await API.getDiscover()
    .then(data => {
      if (data.results.length > 0) {
        console.log(data.results)
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

  async getSearchResults(keyword, year) {
    await API.getSearchResults(keyword, year)
    .then(data => {
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
        this.getSearchResults(this.state.keyword, this.state.year);
      } else {
        this.getDiscover();
      }
    })
  }

  render () {
    const { genreOptions, languageOptions, ratingOptions, totalCount, results } = this.state;

    return (
      <DiscoverWrapper>
        <MobilePageTitle>Discover</MobilePageTitle> {/* MobilePageTitle should become visible on small screens & mobile devices*/}
        <MovieFilters>
          <SearchFilters 
            genres={genreOptions} 
            ratings={ratingOptions}  
            languages={languageOptions}
            searchMovies={event => this.searchMovies(event)}
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
  padding: 60px 35px;
`

const TotalCounter = styled.div`
  font-weight: 900;
`

const MovieResults = styled.div`

`

const MovieFilters = styled.div`

`

const MobilePageTitle = styled.header`

`