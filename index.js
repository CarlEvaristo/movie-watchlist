const searchForm = document.getElementById("search-form")
const mainContainer = document.getElementById("default-message")
let movieArr

function getData(value) {
    movieArr = []
    fetch(`https://www.omdbapi.com/?apikey=24705dce&s=${value}`)
        .then(res => res.json())
        .then(data => {
            movieArr = data.Search.filter(movie => movie.Type === "movie")  // put each movie in array (if type ==="movie")
            // add extra details for each movie 
            movieArr.map(movie => {
                fetch(`https://www.omdbapi.com/?apikey=24705dce&i=${movie.imdbID}`)
                    .then(res => res.json())
                    .then(data2 => {
                        movie.Rating = data2.imdbRating;
                        movie.Runtime = data2.Runtime;
                        movie.Genre = data2.Genre;
                        movie.Plot = data2.Plot 

                        mainContainer.innerHTML = ""
                        movieArr.filter( movie => {
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
                            })
                        })
                })
        })

}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let searchInput = formData.get("search")
    getData(searchInput)
})



