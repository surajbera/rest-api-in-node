console.clear()

const logger = require('morgan')
const express = require('express')
require('./scripts/colors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5001

/* middlewares */
app.use(logger('dev'))
app.use('/api/contacts', require('./routes/contactRoutes'))

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`.info);
})