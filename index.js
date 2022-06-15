const searchForm = document.getElementById("search-form")
const mainContainer = document.getElementById("default-message")
const searchInput = document.getElementById("search")

function renderHtml(movie) {
    searchInput.value = ""
    searchInput.placeholder = "\uf002  Search for another movie"
    
    mainContainer.innerHTML += 
    `
    <div class="movie-wrapper">
        <img class="movie-img" src="${movie.Poster}" alt="Movie poster of ${movie.Title}">
        <div class="movie-data">
            <div class="movie-data-row"><h2>${movie.Title}</h2> <i class="fa-solid fa-star" style="color:#FEC654"></i> <p>${movie.Rating}</p></div>
            <div class="movie-data-row"><p>${movie.Runtime}</p> <p>${movie.Genre}</p> <i class="fa-solid fa-circle-plus"></i> <p>Watchlist</p></div>
            <div class="movie-data-row plot"><p>${movie.Plot}</p></div>
        </div>
    </div>
    `
}

function renderError() {
    searchInput.value = ""
    searchInput.placeholder = "\uf002 No Data" 
    mainContainer.innerHTML = 
    `   <div id="default-message" class="container">
            <h3>Unable to find what you’re looking for.<br> Please try another search.</h3>
        </div>
    `
}

async function searchMovies(value) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=24705dce&s=${value}`)
    let movieArr = await response.json()
    return movieArr.Search
}

async function getMovies(value) {
    let array = await searchMovies(value)
    if (array !== undefined) {
        mainContainer.innerHTML = ""
        for (let movie of array) {
            let response2 = await fetch(`https://www.omdbapi.com/?apikey=24705dce&i=${movie.imdbID}`)
            let data2 = await response2.json()
            movie.Rating = data2.imdbRating
            movie.Runtime = data2.Runtime
            movie.Genre = data2.Genre
            movie.Plot = data2.Plot;
            (data2.Poster === "N/A") && (movie.Poster = "images/no-image-available.jpg")
            console.log(movie)
            renderHtml(movie)
        }
    } else {
        renderError()
    }
}


searchForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let search = formData.get("search")
    getMovies(search)
})



