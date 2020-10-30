const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')
const keys = require('./config/keys')
const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/car')


//подключение к бд
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("MongoDB connected");})
    .catch(error => { console.log(error);})


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/car', carRoutes)

if(process.env.NODE_ENV === 'prodoction') {
    
}

module.exports = app
