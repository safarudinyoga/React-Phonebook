var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/phonebookreact', {
  useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true
});;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var phonebookRouter = require('./routes/phonebook');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/phonebook', phonebookRouter)

module.exports = app;
