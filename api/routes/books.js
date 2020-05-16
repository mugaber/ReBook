const route = require('express').Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')

route.use(auth)

/**
 * @route     api/books POST
 * @desc      add a book to the user books
 * @access    private
 */

route.post('/', async (req, res) => {
  const userId = req.user.id
  const book = req.body

  // check user

  let user

  try {
    user = await User.findById(userId)

    //
  } catch (err) {
    return res.status(500).json({ error: 'Error finding user' })
  }

  if (!user) {
    return res.status(500).json({ error: 'user is not found' })
  }

  // check book

  let bookExists

  user.books.forEach(item => {
    if (item && item.id === book.id) bookExists = true
  })

  if (bookExists) {
    return res.status(500).json({ error: 'Book already saved' })
  }

  // save book

  try {
    user.books.push(book)
    await user.save()
    return res.end()
  } catch (err) {
    return res.status(500).json({ error: 'Error saving book' })
  }
})

/**
 * @route     api/books/delte POST
 * @desc      delete a book from user books
 * @access    private
 */

route.post('/delete', async (req, res) => {
  const userId = req.user.id
  const bookId = req.body.bookId

  // check user

  let user

  try {
    user = await User.findById(userId)

    //
  } catch (err) {
    return res.status(500).json({ error: 'Error finding user' })
  }

  if (!user) {
    return res.status(500).json({ error: 'User is not found' })
  }

  // check book

  let bookExists

  user.books.forEach(item => {
    if (item && item.id === bookId) bookExists = true
  })

  if (!bookExists) {
    return res.status(500).json({ error: 'Book is not saved' })
  }

  // delete book

  try {
    user.books = user.books.filter(item => item.id !== bookId)
    await user.save()
    return res.end()
  } catch (err) {
    return res.status(500).json({ error: 'Error Deleting book' })
  }
})

module.exports = route
