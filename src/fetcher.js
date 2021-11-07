import axios from 'axios';

// All of your API requests should be in this file
class API {
  static init() {
    this.baseURL = 'https://api.themoviedb.org/3';
    this.api_key = '?api_key=62ca00c4a8f08718bec0d8c9d55e46e0';
    this.discover = `${this.baseURL}/discover/movie${this.api_key}`;
    this.genres = `${this.baseURL}/genre/movie/list${this.api_key}`;
  }

  static getDiscover() {
    return axios.get(this.discover).then(res => res.data)
  }

  static getGenres() {
    return axios.get(this.genres).then(res => res.data)
  }

}

API.init()

window.API = API

export default API