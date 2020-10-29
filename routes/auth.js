const express = require('express')
const routes = express.Router()
const controller = require('../controllers/auth')



routes.post('/register', controller.register)
routes.post('/login', routes)
module.exports = routes