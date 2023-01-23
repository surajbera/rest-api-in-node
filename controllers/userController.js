const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

/**
 * @desc Register a user
 * @route POST /api/users/register
 * @access public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }

  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User Already Registered')
  }

  /* Hash Password */
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('User data is not valid')
  }

  res.json({ message: 'User Registered' })
})

/**
 * @desc Login User
 * @route POST /api/users/login
 * @access public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const user = await User.findOne({ email })

  /* Compare password with the hashed password */
  /* 
    password - password given while logging in
    user.password - Hashed password stored in the database 
  */
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1m' }
    )
    res.status(200).json({ accessToken })
  } else {
    res.status(401)
    throw new Error('Email or password is not valid')
  }

  res.json({ message: 'User logged in' })
})

/**
 * @desc Current User
 * @route GET /api/users/current
 * @access private
*/
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  currentUser
}