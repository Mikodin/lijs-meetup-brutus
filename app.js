const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const userRoute = require('./routes/user.route');
const { dbIp } = require('./config/main.config');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbIp.local);

const dbConn = mongoose.connection;
dbConn.on('open', () => { console.log('Successfully Connected to MongoDB'); });
dbConn.on('error', error => console.error(error));

app.use(passport.initialize());
require('./config/passport.config')(passport);

app.get('/', (req, res) => {
  res.send('Welcome To Brutus');
});

app.use('/users', userRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
