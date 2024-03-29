const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const signUpRouter = require('./routes/signUp');
const userDashboardRouter = require('./routes/userDashboard');
const groupDashboardRouter = require('./routes/groupDashboard');
const aboutRouter = require('./routes/about');
const dataRouter = require('./routes/data');
const verifyUserRouter = require('./routes/verifyUser');
const joinGroupRouter = require('./routes/joinGroup');
const joinGoalRouter = require('./routes/joinGoal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ //http://expressjs.com/en/resources/middleware/session.html
  secret: 'notverysecurereplacethiswithenvironmentvariablelatermaybe',
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signUp', signUpRouter);
app.use('/userDashboard', userDashboardRouter);
app.use('/groupDashboard', groupDashboardRouter);
app.use('/about', aboutRouter);
app.use('/data', dataRouter);
app.use('/verifyUser', verifyUserRouter);
app.use('/joinGroup', joinGroupRouter);
app.use('/joinGoal', joinGoalRouter);

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
