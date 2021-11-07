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

  // Write a function to preload the popular movies when page loads & get the movie genres
  componentDidMount() {
    this.getDiscover()
    this.getGenres()
    console.log(this.state)
  }


  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters
  async getDiscover() {
    await API.getDiscover()
    .then(data => {
    console.log(data.results)

      if (data.results.length > 0) {
        const results = data.results;
        this.setState({ results })
      } else if (data.errors) {
        this.alertFunc('There is an error/ change this message')
      }
    })
  }

  async getGenres() {
    await API.getGenres()
    .then(data => {
      console.log(data.genres)
      if (data.genres.length > 0) {
        this.setState({ genreOptions: data.genres })
      } else if (data.errors) {
        this.alertFunc('There is an error on genres/ change this message')
      }
    })
  }

  filteredResults = () => {
    const filteredResults = this.state.results.filter(result =>
      result.title.toLowerCase().includes(this.state.keyword.toLowerCase())
    )
    return filteredResults
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
            searchMovies={(keyword, year) => this.searchMovies(keyword, year)}
          />
        </MovieFilters>
        <MovieResults>
          { totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
          <MovieList 
            movies={this.filteredResults() || results || []}
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