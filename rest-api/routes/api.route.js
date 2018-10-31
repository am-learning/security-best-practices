const express = require('express')
const router  = express.Router()
const reviewsController = require('../controllers/reviews')
const moviesController = require('../controllers/movies')

router.get('/', (req, res) => res.send('Hello API!'))


// reviews API
router.get('/reviews', reviewsController.getAllReviews)
router.get('/reviews/:id', reviewsController.getReview)
router.post('/reviews', reviewsController.addReview)

// movies API
router.get('/movies', moviesController.getAllMovies)
router.get('/movies/:id', moviesController.getMovie)
router.post('/movies', moviesController.addMovie)

module.exports = router