const searchForm = document.getElementById("search-form")
const mainContainer = document.getElementById("default-message")
const searchInput = document.getElementById("search")

function saveMovie(id) {
    try {
        let movies = JSON.parse(localStorage.getItem("movies"));
        if (!movies.includes(id)) {
            movies = [...movies, id]
            localStorage.setItem("movies", JSON.stringify(movies));
            console.log("Movie is saved")
        } else {
            console.log("Movie already saved")
        }
    } catch {
        console.log("No movies yet, create new list in storage")
        let movies = [id]
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}

function renderHtml(movie) {
    searchInput.value = ""
    searchInput.placeholder = "\uf002  Search for another movie"
    const newDiv = document.createElement("div")
    newDiv.className = "movie-wrapper"
    newDiv.innerHTML =     `
        <img class="movie-img" src="${movie.Poster}" alt="Movie poster of ${movie.Title}">
        <div class="movie-data">
            <div class="movie-data-row"><h2>${movie.Title}</h2> <i class="fa-solid fa-star" style="color:#FEC654"></i> <p>${movie.Rating}</p></div>
            <div class="movie-data-row"><p>${movie.Runtime}</p> <p>${movie.Genre}</p> <i id="${movie.imdbID}" class="fa-solid fa-circle-plus movieBtn"></i> <p>Watchlist</p></div>
            <div class="movie-data-row plot"><p>${movie.Plot}</p></div>
        </div>
    `
    mainContainer.appendChild(newDiv)
    document.getElementById(movie.imdbID).addEventListener("click", (event) => saveMovie(event.target.id))
}

function renderError() {
    searchInput.value = ""
    searchInput.placeholder = "\uf002 No Data" 
    mainContainer.innerHTML = 
    `   <div id="default-message" class="container">
            <h3>Unable to find what you're looking for.<br> Please try another search.</h3>
        </div>
    `
}

async function searchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=d5f56738&s=${query}`)
    let movieArr = await response.json()
    getMovies(movieArr.Search)
}

async function getMovies(array) {
    mainContainer.innerHTML = ""
    try {
        for (let movie of array) {
            let response2 = await fetch(`https://www.omdbapi.com/?apikey=d5f56738&i=${movie.imdbID}`)
            let data2 = await response2.json()
            movie.Rating = data2.imdbRating
            movie.Runtime = data2.Runtime
            movie.Genre = data2.Genre
            movie.Plot = data2.Plot;
            (movie.Poster === "N/A") && (movie.Poster = "images/no-image-available.jpg")
            renderHtml(movie)
        }
        
    } catch(error) {
        console.log(error)
        renderError()
    }
}


searchForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let query = formData.get("search")
    searchMovies(query)
})

// document.getElementById("search").addEventListener("input", (e) => searchMovies(e.target.value))