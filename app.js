const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const authRoutes = require('./routes/auth')


//подключение к бд
mongoose.connect(keys.mongoURI)
    .then(() => { console.log("MongoDB connected");})
    .catch(error => { console.log(error);})


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes)
module.exports = app
