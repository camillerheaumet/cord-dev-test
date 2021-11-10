import axios from 'axios';

class API {
  static init() {
    this.baseURL = 'https://api.themoviedb.org/3';
    this.api_key = '?api_key=62ca00c4a8f08718bec0d8c9d55e46e0';
    this.discover = `${this.baseURL}/discover/movie${this.api_key}`;
    this.genres = `${this.baseURL}/genre/movie/list${this.api_key}`;
    this.search = `${this.baseURL}/search/movie${this.api_key}`;
  }

  static getDiscover(genres, rating, language) {
    let queryGenres = '';
    genres && genres.map(genre => queryGenres = queryGenres + `&with_genres=${genre.id}`);

    const queryRating = rating && rating.id ? `&vote_average.gte=${rating.id}` : '';
    const queryLanguage = language && language.id ? `&language=${language.id.toLowerCase()}` : '';

    const queryLink = this.discover + queryGenres + queryRating + queryLanguage;

    return axios.get(queryLink).then(res => res.data);
  }

  static getGenres() {
    return axios.get(this.genres).then(res => res.data)
  }

  static getSearchResults(keyword, year, genres, rating, language) {
    console.log(keyword, year, genres, rating, language)
    let queryGenres = '';
    genres && genres.map(genre => queryGenres = queryGenres + `&with_genres=${genre.id}`);

    const queryRating = rating && rating.id ? `&vote_average.gte=${rating.id}` : '';
    const queryLanguage = language && language.id ? `&language=${language.id.toLowerCase()}` : '';
    const queryYear = parseInt(year) > 0 ? '&year=' + year : '';
    
    const queryLink = this.search + queryGenres + queryRating + queryLanguage + `&query=${keyword}` + queryYear;

    return axios.get(queryLink).then(res => res.data);
  }
}

API.init();

export default API;