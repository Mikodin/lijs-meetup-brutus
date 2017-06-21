const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { tokenSecret } = require('../config/main.config');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  if (!username || !password) {
    res.status(400);
    res.json({
      message: 'Both a valid username and password need to be provided',
    });
    return false;
  }

  newUser.save()
    .then((savedUser) => {
      res.status(200);
      res.json({
        message: `${savedUser.username} Saved successfully`,
      });
      return true;
    })
    .catch((error) => {
      console.error(error);
      res.status(400);
      res.json({
        message: error.errmsg,
        code: error.code,
      });
      return false;
    });
});

router.post('/auth', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user)
        res.send({ message: 'User not found' });
      else {
        user.isProperPassword(password)
          .then((result) => {
            if (result) {
              const token =
                jwt.sign(user, tokenSecret, { expiresIn: '2 days' });

              res.json({
                message: 'Authentication succesful',
                token,
              });
            } else {
              res.status(401);
              res.send({
                message: 'Auth failed',
              });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
            res.send({
              message: err,
            });
          });
      }
    })
    .catch((error) => {
      res.status(400);
      return res.json({
        message: error.errmsg,
        code: error.code,
      });
    });
});

// Example of required auth: protect dashboard route with JWT
router.get('/dashboard',
  passport.authenticate('jwt', { session: false }),
  function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });

module.exports = router;
