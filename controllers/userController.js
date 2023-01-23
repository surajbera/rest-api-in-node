const asyncHandler = require('express-async-handler')

/**
 * @desc Register a user
 * @route POST /api/users/register
 * @access public
*/
const registerUser = asyncHandler((req, res) => {
  res.json({ message: 'Register the user' })
})

/**
 * @desc Login User
 * @route POST /api/users/login
 * @access public
*/
const loginUser = asyncHandler((req, res) => {
  res.json({ message: 'User logged in' })
})

/**
 * @desc Current User
 * @route GET /api/users/current
 * @access private
*/
const currentUser = asyncHandler((req, res) => {
  res.json({ message: 'Current user information' })
})

module.exports = {
  registerUser,
  loginUser,
  currentUser
}