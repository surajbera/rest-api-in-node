console.clear()

const logger = require('morgan')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/connectDb')
require('./scripts/colors')
require('dotenv').config()
/* connecting to db before express() */
connectDb()
const app = express()
const port = process.env.PORT || 5001

/* middlewares */
app.use(express.json())
app.use(logger('dev'))
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
/* error handler middleware */
app.use(errorHandler)

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`.info);
})