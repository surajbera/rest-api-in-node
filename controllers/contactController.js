const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

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
  const contact = await Contact.create({
    name,
    email,
    phone
  })
  res.status(201).json(contact)
})

/**
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access public
*/
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts)
})

/**
 * @desc Get a contact
 * @route GET /api/contact/:id
 * @access public
*/
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  } else {
    res.status(200).json(contact)
  }
  res.status(200).json({ message: `Get contact for ${req.params.id}` })
})

/**
 * @desc Update a contact
 * @route PUT /api/contact/:id
 * @access private
*/
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedContact)
})

/**
 * @desc Delete a contact
 * @route DELETE /api/contact/:id
 * @access private
*/
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }
  /* Tutor was using Contact.remove */
  await Contact.findByIdAndDelete(contact)
  res.status(200).json(contact)
})


module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
}