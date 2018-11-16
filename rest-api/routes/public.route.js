
const express = require('express')
const router  = express.Router()
const moviesController = require('../controllers/movies')
const session       = require('../helpers/session')

/*** PUBLIC APIS ***/
// movies API (tested)
router.get('/movies',       session.guests , moviesController.getAllMovies)
router.get('/movies/:id',   moviesController.getMovie)
router.post('/movies',      moviesController.addMovie)

module.exports = router