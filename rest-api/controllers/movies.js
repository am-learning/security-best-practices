let movies = []

exports.getAllMovies = (req, res) => {
    res.status(200).send(movies)
}

exports.addMovie = (req, res) => {    
    movies.push(req.body)
    res.status(200).json({message: "Successfully inserted new Movie"})
}