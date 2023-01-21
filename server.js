console.clear()

const logger = require('morgan')
const express = require('express')
require('./scripts/colors')
const dotenv = require('dotenv').config()
const app = express()

/* middlewares */
app.use(logger('dev'))

const port = process.env.PORT || 5001

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`.info);
})