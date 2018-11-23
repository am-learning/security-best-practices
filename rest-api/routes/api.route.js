const express = require('express')
const router  = express.Router()
const reviewsController = require('../controllers/reviews')
const passport      = require('../helpers/passport')

router.get('/', (req, res) => res.send('Hello APIs Home!'))

/*** PROTECTED APIS ***/
// TODO: are these REST API's? They must be stateless then
// reviews API
router.get('/reviews',      passport.authorize, reviewsController.getAllReviews)
router.get('/reviews/:id',  passport.authorize, reviewsController.getReview)
router.post('/reviews',     passport.authorize, reviewsController.addReview)


module.exports = router