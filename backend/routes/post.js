const postRoute = require("express").Router()
const postController = require("../controllers/postController")

//const auth = require('../middlewares/auth')
const upload = require('../middlewares/multer')

postRoute.get('/', postController.getPost)
postRoute.post('/add', upload.single('image'), (req, res) => {
  res.send(req.file)
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
postRoute.put('/update/:id', postController.updatePost)
postRoute.delete('/delete/:id', postController.deletePost)
postRoute.get('/:id', postController.getPostById)

module.exports = postRoute