const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')
const keys = require('../config/keys')

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate) {
        //пользователь с таким email уже существует, попробуйте другой
        res.status(409).json({
            message: "такой email уже занят, попробуйте другой"
        })
    } else {
        //создаем пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            phone: req.body.phone
        })

        try {
                await user.save()
                res.status(201).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate) {
        //проверка паролья (пользоваль существует)
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if(passwordResult) {
            //генерация токена
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        }
    } else {
        //пользователя нет 
        res.status(404).json({
            message: "Пользователя с таким email не найден"
        })
    }
}