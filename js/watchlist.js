const mainContainer = document.getElementById("default-message")

function removeMovie(id) {
    let movies = JSON.parse(localStorage.getItem("movies"));
    movies = movies.filter(item => item.imdbID !== id)
    localStorage.setItem("movies", JSON.stringify(movies));
    renderWatchlist(movies)

    if (movies.length === 0) {
        renderError()
    } 
}

function renderWatchlist(array) {
    mainContainer.innerHTML = array.map(movie => 
         `<div class="movie-wrapper">
            <img class="movie-img" src="${movie.Poster}" alt="Movie poster of ${movie.Title}">
            <div class="movie-data">
                <div class="movie-data-row"><h2>${movie.Title}</h2> <i class="fa-solid fa-star" style="color:#FEC654"></i> <p>${movie.Rating}</p></div>
                <div class="movie-data-row"><p>${movie.Runtime}</p> <p>${movie.Genre}</p> <i id="${movie.imdbID}" class="fa-solid fa-circle-minus movieBtn"></i> <p>Watchlist</p></div>
                <div class="movie-data-row plot"><p>${movie.Plot}</p></div>
            </div>
        </div>`
    ).join("")

    array.map(movie => {
        document.getElementById(movie.imdbID).addEventListener("click", (event) => removeMovie(event.target.id))
    })
}

function renderError() {
    mainContainer.innerHTML = 
    `   <div id="default-message" class="container">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html"><p href="index.html" class="movie-data-row"><i class="fa-solid fa-circle-plus"></i><strong>Let's add some movies!</strong></p></a>
        </div>
    `
}


try {
    let array = JSON.parse(localStorage.getItem("movies"))
    renderWatchlist(array)
} catch {
    console.log("no movies yet")
    // renderError()
}