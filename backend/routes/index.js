const route = require('express').Router()

route.get('/', (req, res) => {
    res.status(200).json({
        message: "Article Posts App"
    })
})

const userRoutes = require('./user')

route.use('/users', userRoutes)

module.exports = route