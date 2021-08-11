import DataSource from '../data/data-source'

import '../component/movie-list.js'

const main = () => {
  const movieSearchButton = document.getElementById('movie-search-button')
  const movieSearchInput = document.getElementById('movie-search-input')

  const movieListElement = document.querySelector('movie-list')

  movieSearchButton.addEventListener('click', () => {
    loadDataFromServer('keyword', movieSearchInput.value)
  })

  const loadDataFromServer = async (source, value) => {
    let movies = []

    try {
      switch (source) {
        case 'keyword':
          movies = await getDataFromServerByKeywords(value)
          console.log('keyword')
          break
        case 'movieType':
          movies = await getDataFromServerByMovieType(value)
          console.log('movieType')
          break
        default:
          movies = await getDataFromServerByMovieType(value)
          console.log('movieType')
          break
      }

      movieListElement.movies = movies
    } catch (message) {
      movieListElement.renderError(message)
    }
  }

  const getDataFromServerByKeywords = async (keyword) => {
    const movies = await DataSource.searchMovieByKeyword(encodeURI(keyword))
    return movies
  }

  const getDataFromServerByMovieType = async (movieType) => {
    const movies = await DataSource.searchMovieByType(movieType)
    return movies
  }

  const resetAllButtonColor = () => {
    document.querySelectorAll('.movie-type-changer-button').forEach(movieButton => {
      movieButton.classList.remove('text-white')
    })
  }

  document.querySelectorAll('.movie-type-changer-button').forEach(movieButton => {
    movieButton.addEventListener('click', () => {
      resetAllButtonColor()
      movieButton.classList.add('text-white')
      loadDataFromServer('movieType', movieButton.value)
      movieSearchInput.value = ''
    })
  })

  window.onload = () => {
    loadDataFromServer('movieType', 'popular')
  }
}

export default main
