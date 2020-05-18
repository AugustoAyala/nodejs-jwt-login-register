const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretKey = 'thekeysecret'
const User = require('../models/auth-model')
exports.create = async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
        }
        const user = new User(newUser)
        await user.save()
        const expiresIn = 24 * 60 * 60
        const accesToken = jwt.sign({ id: user.id }, secretKey, {
            expiresIn: expiresIn,
        })
        const data = {
            name: user.name,
            email: user.email,
            token: accesToken,
            expiresIn: expiresIn,
        }
        res.send({ data })
    } catch (error) {
        if (error && error.code === 11000)
            return res.status(409).send('Email entered already exists')
        if (error) return res.status(500).send('Server error')
    }
}

exports.login = async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        }
        const user = await User.findOne({ email: userData.email })

        if (!user) {
            res.status(409).send({ message: 'Something is wrong' })
        } else {
            const resultPassword = bcrypt.compareSync(
                userData.password,
                user.password
            )
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60
                const accesToken = jwt.sign({ id: user.id }, secretKey, {
                    expiresIn: expiresIn,
                })
                const data = {
                    name: user.name,
                    email: user.email,
                    token: accesToken,
                    expiresIn: expiresIn,
                }
                res.send({ data })
            } else {
                res.status(409).send({ message: 'Something is wrong' })
            }
        }
    } catch (error) {
        res.status(500).send('Server error')
    }
}
