import DataSource from "../data/data-source";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const main = () => {
    // Completing Functionality
    let movieSearchButton = document.getElementById('movie-search-button');
    let movieSearchInput = document.getElementById('movie-search-input');

    let modalMovieDetails = new bootstrap.Modal(document.getElementById('modal-movie-details'));
    
    movieSearchButton.addEventListener('click', () => {
        loadDataFromServer('keyword', movieSearchInput.value);
    });

    const loadDataFromServer = async (source, value) => {
        let movies = [];

        switch(source){
            case 'keyword':
                movies = await getDataFromServerByKeywords(value);
                break;
            case 'movie_type':
                movies = await getDataFromServerByMovieType(value);
                break;
            default:
                movies = await getDataFromServerByMovieType(value);
                break;
        }

        renderItemContainer(movies);
    }
    
    const getDataFromServerByKeywords = async (keyword) => {
        let movies = await DataSource.searchMovieByKeyword(encodeURI(keyword));
        return movies;
    }

    const getDataFromServerByMovieType = async (movie_type) => {
        let movies = await DataSource.searchMovieByType(movie_type);
        return movies;
    }

    const renderItemContainer = (movies) => {
        let cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

        movies.forEach(movie => {
            let divElement = document.createElement('div');
            let cardItemElement = `
            <img src="${movie.poster}" class="rounded" alt="${movie.title}" style="height: 22rem; width: 14.5rem; object-fit: cover;">
            <div class="card-body w-100 position-absolute bottom-0 pt-5" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0,0,0,0));">
                <h5 class="card-title text-white">${movie.title}</h5>
                <span class="d-none" id="movie-description">${movie.description}</span>
            </div>
            <span class="badge bg-warning text-dark position-absolute top-0 fs-6 d-flex align-middle" style="top: 1rem!important; right: 1rem!important;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg> ${movie.rating}
            </span>
            `;
            divElement.classList.add('card-item', 'card', 'border-0', 'mb-3', 'me-3');
            divElement.innerHTML += cardItemElement;
            divElement.addEventListener('click', () => {
                console.log(movie.description);
                document.getElementById('modal-title').innerText = movie.title;
                document.getElementById('modal-image').src = movie.poster;
                document.getElementById('modal-description').innerText = movie.description;
                document.getElementById('modal-rating').innerText = movie.rating;
                modalMovieDetails.show();
            });
            cardContainer.appendChild(divElement);
        });
    }

    const resetAllButtonColor = () => {
        document.querySelectorAll('.movie-type-changer-button').forEach(movie_button => {
            movie_button.classList.remove('text-white');
        });
    }
    
    document.querySelectorAll('.movie-type-changer-button').forEach(movie_button => {
        movie_button.addEventListener('click', () => {
            resetAllButtonColor();
            movie_button.classList.add('text-white');
            loadDataFromServer('movie_type', movie_button.value);
            movieSearchInput.value = '';
        });
    });
    
    window.onload = () => {
        loadDataFromServer('movie_type', 'popular');
    }

    // Bootstrap popover to show descriptions
    
    // Axios AJAX
    // Custom elements
    // ESLint
    // Webpack code-spliting
    // Webpack minifying
}

export default main;