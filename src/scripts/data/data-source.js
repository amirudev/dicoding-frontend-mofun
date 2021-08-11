const axios = require('axios')

class Movie {
  constructor (title, overview, voteAverage, posterPath) {
    this.title = title
    this.description = overview
    this.rating = voteAverage
    this.poster = `https://image.tmdb.org/t/p/original${posterPath}`
  }
}

class DataSource {
  static searchMovieByKeyword (keyword = '', page = 1) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=59dad850c5d1fe1c602e5906b245fe7a&query=${keyword}&page=${page}`)
        .then(response => {
          const movies = []
          response.data.results.forEach(movie => {
            movies.push(new Movie(movie.title, movie.overview, movie.vote_average, movie.poster_path))
          })
          resolve(movies)
        }).catch(err => {
          reject(err)
        })
    })
  }

  static searchMovieByType (movieType = 'popular', page = 1) {
    return new Promise((resolve, reject) => {
      axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=59dad850c5d1fe1c602e5906b245fe7a&page=${page}`)
        .then(response => {
          const movies = []
          response.data.results.forEach(movie => {
            movies.push(new Movie(movie.title, movie.overview, movie.vote_average, movie.poster_path))
          })
          resolve(movies)
        }).catch(err => {
          reject(err)
        })
    })
  }
}

export default DataSource
