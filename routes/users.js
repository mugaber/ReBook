const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')
const authMidd = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

/**
 * @route     /users/auth
 * @desc      Auth user & send user data
 * @access    private
 */

router.get('/auth', authMidd, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password')
    res.json({ user })

    //
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Internal Server Error ' + err.message }] })
  }
})

/**
 * @route     /users/auth
 * @desc      Login user & send token
 * @access    public
 */

router.post(
  '/auth',

  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please include a password').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() })

    const { email, password } = req.body

    try {
      const user = await UserModel.findOne({ email: email })
      if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err
        res.json({ token })
      })

      //
    } catch (err) {
      res.status(500).json({ errors: [{ msg: 'Internal Server Error ' + err.message }] })
    }
  }
)

/**
 * @rout      /users
 * @desc      register user if not exists & send token
 * @access    public
 */

router.post(
  '/',

  [
    check('username', 'Username is required and at least 2 char')
      .exists()
      .isLength({ min: 2 }),
    check('email', 'Please provide valid email').isEmail(),
    check('password', 'Please provide at least 6 char password').isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { username, email, password } = req.body

    try {
      const user = await UserModel.findOne({ email })

      if (user)
        return res.status(400).json({ errors: [{ msg: 'User already registered' }] })

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const newUser = new UserModel({ username, email, password: hash })

      await newUser.save()

      const payload = {
        user: {
          id: newUser.id
        }
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err
        return res.json({ token })
      })

      //
    } catch (err) {
      if (err.name === 'MongoError' && err.keyPattern.username) {
        return res.status(400).json({ errors: [{ msg: 'Username already taken' }] })
      }

      res.status(500).json({ errors: [{ msg: 'Internal Server Error ' + err.message }] })
    }
  }
)

module.exports = router
