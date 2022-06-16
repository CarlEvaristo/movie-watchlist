const mainContainer = document.getElementById("default-message")

function removeMovie(id) {
    let movies = JSON.parse(localStorage.getItem("movies"));
    movies = movies.filter(item => item !== id)
    if (movies.length === 0) {
        localStorage.removeItem("movies")
        renderError()
    } else {
        localStorage.setItem("movies", JSON.stringify(movies));
        getMovies(movies)
    }
}

function renderWatchlist(movie) {
    const newDiv = document.createElement("div")
    newDiv.className = "movie-wrapper"
    newDiv.innerHTML = `
        <img class="movie-img" src="${movie.Poster}" alt="Movie poster of ${movie.Title}">
        <div class="movie-data">
            <div class="movie-data-row"><h2>${movie.Title}</h2> <i class="fa-solid fa-star"></i> <p>${movie.Rating}</p></div>
            <div class="movie-data-row"><p>${movie.Runtime}</p> <p>${movie.Genre}</p> <i id="${movie.imdbID}" class="fa-solid fa-circle-minus movieBtn"></i> <p>Watchlist</p></div>
            <div class="movie-data-row plot"><p>${movie.Plot}</p></div>
        </div>
    `
    mainContainer.appendChild(newDiv)
    document.getElementById(movie.imdbID).addEventListener("click", (event) => removeMovie(event.target.id))
}

function renderError() {
    mainContainer.innerHTML = 
    `   <div id="default-message" class="container">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html"><p href="index.html" class="movie-data-row"><i class="fa-solid fa-circle-plus"></i><strong>Let's add some movies!</strong></p></a>
        </div>
    `
}

async function getMovies(array) {
    mainContainer.innerHTML = ""
    try {
        for (let id of array) {
            let movie = {}
            let response2 = await fetch(`https://www.omdbapi.com/?apikey=d5f56738&i=${id}`)
            let data2 = await response2.json()
            movie.imdbID = data2.imdbID
            movie.Title = data2.Title
            movie.Rating = data2.imdbRating
            movie.Runtime = data2.Runtime
            movie.Genre = data2.Genre
            movie.Plot = data2.Plot;
            movie.Poster = data2.Poster;
            (movie.Poster === "N/A") && (movie.Poster = "images/no-image-available.jpg");
            renderWatchlist(movie)
        }
    } catch(error) {
        console.log(error)
        renderError()
    }
}



try {
    let array = JSON.parse(localStorage.getItem("movies"))
    getMovies(array)
} catch {
    console.log("no movies yet")
    renderError()
}