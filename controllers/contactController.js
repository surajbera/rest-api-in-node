const asyncHandler = require('express-async-handler')

/**
 * @desc Create a new contact
 * @route POST /api/contacts
 * @access private
*/
const createContact = asyncHandler(async (req, res) => {
  console.log('The request body is: ', req.body);
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  res.status(201).json({ message: 'Create Contact' })
})

/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access public
*/
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get All Contacts' })
})

/**
 * @desc Get a contact
 * @route GET /api/contact/:id
 * @access public
*/
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` })
})

/**
 * @desc Update a contact
 * @route PUT /api/contact/:id
 * @access private
*/
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Update contact for ${req.params.id}' })
})

/**
 * @desc Delete a contact
 * @route DELETE /api/contact/:id
 * @access private
*/
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` })
})


module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
}