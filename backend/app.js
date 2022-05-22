const express = require('express');
const app = express();

require('dotenv').config()
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors')
app.use(cors())

const routes = require('./routes')
app.use(routes)

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})