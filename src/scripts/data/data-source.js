const axios = require('axios');

class DataSource {
    static searchMovieByKeyword(keyword = '', page = 1){
        return new Promise((resolve, reject) => {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=59dad850c5d1fe1c602e5906b245fe7a&query=${keyword}&page=${page}`)
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        })
    }

    static searchMovieByType(movie_type = 'popular', page = 1){
        return new Promise((resolve, reject) => {
            axios.get(`https://api.themoviedb.org/3/movie/${movie_type}?api_key=59dad850c5d1fe1c602e5906b245fe7a&page=${page}`)
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default DataSource;