const express = require('express')
const router  = express.Router()
const reviewsController = require('../controllers/reviews')
const passport      = require('../helpers/passport')

router.get('/', (req, res) => res.send('Hello API!'))

/*** PROTECTED APIS ***/
// reviews API
router.get('/reviews',      passport.authorize, reviewsController.getAllReviews)
router.get('/reviews/:id',  passport.authorize, reviewsController.getReview)
router.post('/reviews',     passport.authorize, reviewsController.addReview)


module.exports = router