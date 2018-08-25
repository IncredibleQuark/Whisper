const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config/database')
const User = require('../../models/user/user')

// Register
router.post('/register', (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  User.getUserByEmail(newUser.email, (err, user) => {

    if (err) throw err
    if (user) {
      return res.json({success: false, msg: 'Email taken'})
    }
    User.addUser(newUser, (err, user) => {

      if (err) {
        res.json({success: false, msg: 'Failed to register user'})
      } else {
        res.json({success: true, msg: 'User registered'})
      }
    })

  })
})

router.post('/authenticate', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User.getUserByEmail(email, (err, user) => {

    if (err) throw err
    if (!user) {
      return res.json({success: false, msg: 'Email not found'})
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      let token

      if (err) throw err

      if (isMatch) {

        token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        })

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'})
      }
    })
  })
})

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {

  const data = {
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    rank: req.user.rank
  }

  return res.json({data: data})
})

module.exports = router
