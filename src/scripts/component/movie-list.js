import './movie-item.js'

import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'

class MovieList extends HTMLElement {
  constructor () {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'open' })
  }

  set movies (movies) {
    this._movies = movies
    this.render()
  }

  get movies () {
    this.render()
  }

  render () {
    this.shadowDOM.innerHTML = `
        <style>
        .movie-container {
            display: flex;
            justify-content: center;
            align-content: start;
            flex-wrap: wrap;
        }

        @media only screen and (max-width: 576px) {
            movie-item {
                width: 45%!important;
            }
        }
        </style>
        `
    const divMovieContainer = document.createElement('div')
    divMovieContainer.classList.add('movie-container')
    this._movies.forEach(movie => {
      const movieItemElement = document.createElement('movie-item')
      movieItemElement.movie = movie
      movieItemElement.addEventListener('click', () => {
        document.getElementById('moviedetail-title').innerText = movie.title
        document.getElementById('moviedetail-image').src = movie.poster
        document.getElementById('moviedetail-details').innerText = movie.description
        const movieDetails = new bootstrap.Modal(document.getElementById('moviedetails'))
        movieDetails.show()
      })
      divMovieContainer.appendChild(movieItemElement)
    })
    this.shadowDOM.appendChild(divMovieContainer)
  }

  renderError (message) {
    this.shadowDOM.innerHTML = `
        <style>
            .alert {
                color: #842029;
                background-color: #f8d7da;
                border-color: #f5c2c7;
                position: relative;
                padding: 1rem 1rem;
                margin-bottom: 1rem;
                border: 1px solid transparent;
                border-radius: 0.25rem;
            }
        </style>
        <div class="alert">
            ${message}
        </alert>
        `
    this.shadowDOM = document.createElement('div')
    this.shadowDOM.classList.add('alert', 'alert-danger')
    this.shadowDOM.textContent = message
  }
}

customElements.define('movie-list', MovieList)