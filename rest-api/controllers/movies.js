let movies = []
// external API to get movies http://omdbapi.com/

// TODO: make sure the functions are async when the actual database is accessed
exports.getAllMovies = (req, res) => {
    res.status(200).send(movies)
}

exports.addMovie = (req, res) => {    
    movies.push(req.body)
    res.status(200).json({message: "Successfully inserted new Movie"})
}

exports.getMovie = (req, res) => {
    //console.log(req.params.id)
    let movie = movies.filter(m => m.id == req.params.id)
    //console.log(movie)
    if (movie.length == 0){
        res.status(200).json({message: 'Movie with given id not found'})
    }else{
        res.status(200).json(movie[0])
    }
    
}

