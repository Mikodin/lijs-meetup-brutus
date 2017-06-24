const express = require('express');
const passport = require('passport');

const Word = require('../models/word.model');

const router = express.Router();

router.get('/:word',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const word = req.params.word;
    Word.findOne({ word })
      .then((foundWord) => {
        if (!foundWord) res.json({ hasPassword: false, message: 'Password not found' });
        res.json({ hasPassword: true, message: 'Password was found.' });
      })
      .catch((error) => {
        console.error(error);
        console.error(`Internal Error, Word.findOne(${word})`);
        res.status(500);
        res.json({ error });
      });
  });

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
        console.error(`Internal Error, Word.save(${newWord})`);
        res.status(500);
        res.json({ error });
        return false;
      });
  });

module.exports = router;
