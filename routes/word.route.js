const express = require('express');
const passport = require('passport');

const Word = require('../models/word.model');

const router = express.Router();

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { word } = req.body;

    const newWord = new Word({ word });

    newWord.save()
      .then((savedWord) => {
        res.status(200);
        res.json({
          message: `${savedWord.word} Saved successfully`,
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

module.exports = router;
