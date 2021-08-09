const axios = require('axios');

class DataSource {
    static searchMovie(keyword){
        return new Promise((resolve, reject) => {
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=59dad850c5d1fe1c602e5906b245fe7a&language=en-US&page=1')
            .then(response => {
                resolve(response);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default DataSource;