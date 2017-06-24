const express = require('express');
const jwt = require('jsonwebtoken');

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
      console.error(`Internal Error, User.save(${JSON.stringify(newUser)})`);
      res.status(500);
      res.json({ error });
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
          .catch((error) => {
            console.error(error);
            console.error(`Internal Error, User.isProperPassword(${password})`);
            res.status(500);
            res.json({ error });
          });
      }
    })
    .catch((findError) => {
      console.error(findError);
      console.error(`Internal Error, User.findOne(${username})`);
      res.status(500);
      res.json({ findError });
    });
});

module.exports = router;
