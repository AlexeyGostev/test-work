const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

const objects = require('./routes/objects');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/objects', objects);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return next(404);
});

// error handler
app.use((err, req, res, next) =>{
  console.log(err);
  if ((typeof err) === 'number') {
    res.status(err).json({
      message: http.STATUS_CODES[err],
    })
  } else {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

module.exports = app;
