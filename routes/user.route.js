const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const router = express.Router();

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  if (!email || !password) {
    res.status(400);
    res.json({
      message: 'Both a valid email and password need to be provided',
    });
    return false;
  }

  user.save()
    .then((savedUser) => {
      res.status(200);
      res.json({
        message: `${savedUser.email} Saved successfully`,
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
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error) {
      res.status(400);
      return res.json({
        message: error.errmsg,
        code: error.code,
      });
    }

    if (!user)
      res.send({ message: 'User not found' });
    else {
      user.isProperPassword(password)
        .then((result) => {
          if (result) {
            const token = jwt.sign(user, 'Super Secret', { expiresIn: '2 days' });
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
  });
});

module.exports = router;
