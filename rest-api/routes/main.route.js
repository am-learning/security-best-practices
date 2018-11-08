const express = require('express')
const router  = express.Router()
const userController = require('../controllers/users')

// the main route (not exactly needed)
router.get('/', (req, res) => res.send('Hello Main!'))

// Routes for: login, logout, user registration, password recovery
router.post('/login',       userController.login)
router.post('/register',    userController.register)
router.post('/logout',       userController.logout)

module.exports = router