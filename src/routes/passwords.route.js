const express = require('express');
const passport = require('passport');

const Password = require('../models/password.model');

const router = express.Router();

router.get('/:password',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const password = req.params.word;

    Password.findOne({ password })
      .then((foundPassword) => {
        if (!foundPassword)
          res.json({ foundPassword: false, message: 'Password not found' });

        res.json({ foundPassword: true, message: 'Password was found.' });
      })
      .catch((error) => {
        console.error(error);
        console.error(`Internal Error, Word.findOne(${password})`);
        res.status(500);
        res.json({ error });
      });
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // console.log(req);
    const { password } = req.body;
    const newPassword = new Password({ password });

    newPassword.save()
      .then((savedPassword) => {
        res.status(200);
        res.json({
          message: `${savedPassword.password} Saved successfully`,
        });
        return true;
      })
      .catch((error) => {
        console.error(error);
        console.error(`Internal Error, Password.save(${newPassword})`);
        res.status(500);
        res.json({ error });
        return false;
      });
  });

module.exports = router;
