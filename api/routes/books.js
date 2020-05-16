const route = require('express').Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')

/**
 * @route     api/books POST
 * @desc      add a book to the user books
 * @access    private
 */

route.post('/', auth, async (req, res) => {
  const userId = req.user.id
  const book = req.body

  // check user

  const user = await User.findById(userId)

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

module.exports = route
