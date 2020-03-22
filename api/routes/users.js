const router = require('express').Router()

const { check, validationResult } = require('express-validator')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * @extends       api / users
 * @access        public
 * @description   register user if not exists and sign jwt
 */

router.post(
  '/',

  [
    check('username', 'Username is required and at least 2 char')
      .exists()
      .isLength(2),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Please provide at least 6 char password').isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.json({ errors: errors.array() })
    const { username, email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (user)
        return res.status(400).json({ errors: [{ msg: 'User already registered' }] })

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)

      const newUser = new User({ username, email, password: hash })

      await newUser.save()

      jwt.sign(
        { user: { id: newUser._id } },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send(`Internal Server Error. ${err.message}`)
    }
  }
)

module.exports = router
