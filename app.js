const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(config.db.local);

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.on('open', () => {
  console.log('Connected to Mongo');
});

app.get('/', (req, res) => {
  res.send('Welcome To Brutus');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);

