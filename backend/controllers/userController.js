const { TblUser } = require('../models')
const { decryptPswd } = require('../helpers/bcrypt')

class UserController {
    static async getAllUsers(req, res) {
        try {
            let users = await TblUser.findAll()

            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password, image, age } = req.body

            let result = await TblUser.create({
                username, email, password, image, age
            })
            res.status(201).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body
            let usernameFound = await TblUser.findOne({
                where: {
                    username
                }
            })

            if (usernameFound) {
                if (decryptPswd(password, usernameFound.password)) {

                    res.status(200).json(usernamelFound)
                } else {
                    res.status(403).json({
                        message: "Invalid password!"
                    })
                }
            } else {
                res.status(404).json({
                    message: 'User not found!'
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            const id = +req.params.id
            const { username, email, password, image, age } = req.body;
            let result = await TblUser.update({
                username, email, password, image, age
            }, {
                where: { id }
            })

            res.status(201).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            const id = +req.params.id
            let result = await TblUser.destroy({
                where: { id }
            })
            result === 1 ?
                res.status(200).json({
                    message: `User id ${id} deleted successfully!`
                }) :
                res.status(404).json({
                    message: `User id ${id} not deleted successfully!`
                })
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async getUserById(req, res) {
        try {
            const id = +req.params.id
            let result = await TblUser.findByPk(id)

            res.status(200).json(result)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController