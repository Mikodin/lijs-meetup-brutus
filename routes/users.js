const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Hello User');
});

module.exports = router;
