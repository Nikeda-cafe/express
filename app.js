var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// views router
var indexRouter = require('./routes/views/index');
var usersRouter = require('./routes/views/users');
var helloViewsRouter = require('./routes/views/hello/index');
var informationViewsRouter = require('./routes/views/information/index');

// api router
var samplesApiRouter = require('./routes/api/samples');  

var app = express();

// session
const session = require('express-session');

var sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60*60*1000}
}
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// views route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloViewsRouter);
app.use('/information', informationViewsRouter);

// api route
app.use('/api/v1/samples', samplesApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;