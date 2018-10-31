const express = require('express')
const router  = express.Router()
const userController = require('../controllers/users')

router.get('/', (req, res) => res.send('Hello Main!'))

// the login, user registration, password recovery and logout routes go here
router.post('/login', userController.login)
router.post('/register', userController.register)
module.exports = router