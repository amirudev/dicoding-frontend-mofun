class MovieItem extends HTMLElement {
  constructor () {
    super()
    this.shadowDOM = this.attachShadow({ mode: 'open' })
  }

  set movie (movie) {
    this._movie = movie
    this.render()
  }

  get movie () {
    this.render()
  }

  render () {
    const divMovieItem = document.createElement('div')

    divMovieItem.innerHTML = `
        <style>
            .card {
                margin: 0 1rem 1rem 0;
                position: relative;
            }

            img {
                min-height: 10rem;
                width: 14.5rem;
                object-fit: cover;
                border-radius: 0.25rem;
            }

            .card-body {
                background-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0,0,0,0));
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                color: white;
                font-family: Nunito, 'Segoe UI', sans-serif;
                font-size: 1.20rem;
                padding-top: 3rem;
            }

            .card-body .card-title {
                padding: 0 1rem;
            }

            .card-body span {
                display: none;
            }

            .rating-badge {
                display: flex;
                padding: .35em .65em;
                font-size: 0.85rem;
                font-weight: 700;
                line-height: 1;
                color: #222;
                text-align: center;
                white-space: nowrap;
                border-radius: .25rem;
                background-color: rgba(var(--bs-warning-rgb),var(--bs-bg-opacity)) !important;
                position: absolute;
                top: 0.5rem;
                left: 0.5rem;
                align-items: end;
                width: 2.3rem;
            }

            .rating-badge span {
                padding-left: 0.2rem;
            }
            
            @media only screen and (max-width: 576px) {
                .card {
                    margin: 0 0.3rem 0.3rem 0;
                }

                .card img {
                    width: 100%;
                }
            }
        </style>
        <div class="card">
            <img src="${this._movie.poster}" alt="${this._movie.title}">
            <div class="card-body">
                <h5 class="card-title text-white">${this._movie.title}</h5>
                <span id="movie-description">${this._movie.description}</span>
            </div>
            <span class="rating-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill me-1" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg> <span>${this._movie.rating}</span>
            </span>
        </div>
        `

    this.shadowDOM.appendChild(divMovieItem)
  }
}

customElements.define('movie-item', MovieItem)
