const route = require('express').Router()

route.get('/', (req, res) => {
    res.status(200).json({
        message: "Codigram App"
    })
})

const homeController = require('../controllers/homeController')
route.get('/', homeController.getHome)

const userRoute = require('./user')
route.use('/backend/user', userRoute)

const postRoute = require('./post')
route.use('/backend/post', postRoute)

module.exports = route