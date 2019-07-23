let moviesList = document.getElementById("moviesList")
let batmanMoviesURL = "http://www.omdbapi.com/?s=batman&apikey=edffb324"
let movieInfo = document.getElementById("movieInfo")

let req = new XMLHttpRequest()
function showDetails(imdbID){
    let detailsURL = `http://www.omdbapi.com/?i=${imdbID}&apikey=edffb324`
    let req = new XMLHttpRequest()
    req.open('GET', detailsURL)
    req.addEventListener('load', () =>{
        let details = JSON.parse(event.currentTarget.responseText)
        movieInfo.innerHTML = `<div>
                                    <span>${details.Title}</span>
                                    <h4>Release Year: ${details.Year}</h4>
                                    <p>Plot: ${details.Plot}</p>
                                    <p>Starring: ${details.Actors}</p>
                                    <p>Directed by: ${details.Director}</p>
                                    <p>Written by: ${details.Writer}</p>                  
                                </div>`
    })
    req.send()
}

req.open('GET', batmanMoviesURL)
req.addEventListener('load',() => {

    let movies = JSON.parse(event.currentTarget.responseText)

    let batmanMovieItems = movies.Search.map( movie => {
        return `<div>
                    <h2>${movie.Title}</h2>
                    <img src='${movie.Poster}' onclick="showDetails('${movie.imdbID}')"></img> 
                </div>`

    })

    console.log(movies.Search)

    moviesListDiv.innerHTML = batmanMovieItems.join('')

})

req.send()



















// http://www.omdbapi.com/?s=batman&apikey=917e144a //