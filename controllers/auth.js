const bcrypt = require('bcryptjs')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')


module.exports.register = async function(req, res) {

}

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if(candidate) {
        //пользователь существует
        res.status(409).json({
            message: 'Такой email уже существует'
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })
        try {
            await user.save()
            res.status(200).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    } 
}