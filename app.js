const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const { dbIp } = require('./src/config/main.config');

const userRoute = require('./src/routes/users.route');
const passwordRoute = require('./src/routes/passwords.route');

const app = express();
app.use(bodyParser.json());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect(dbIp.local);

const dbConn = mongoose.connection;
dbConn.on('open', () => { console.log('Successfully Connected to MongoDB'); });
dbConn.on('error', error => console.log(error));

app.use(passport.initialize());
require('./src/config/passport.config')(passport);

app.get('/', (req, res) => {
  res.send('Welcome To Brutus');
});

app.use('/users', userRoute);
app.use('/passwords', passwordRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(3000);
