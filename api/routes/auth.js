const router = require('express').Router()

const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * @alias api/auth
 * @access restricted
 * @description get user info after checking token
 */

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({ user })
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server Error')
  }
})

/**
 * @alias api/auth
 * @access public
 * @description auth user using email and pass, sign jwt token
 */

router.post(
  '/',

  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please include a password').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const user = await User.findOne({ email: email })
      if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

      const isMatch = await bcrypt.compare(password, user.passowrd)
      if (!isMatch)
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

      jwt.sign(
        { user: { id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
