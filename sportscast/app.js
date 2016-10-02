var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require("connect-flash");

var routes = require('./routes/index');
var users = require('./routes/users');
var watch_login = require('./routes/watch_login');
var login = require('./routes/login');
var watch = require('./routes/watch');
var cast = require('./routes/cast');
var createaccount = require('./routes/createaccount');
var sportsnames = require('./routes/sportsnames');
var sportsid = require('./routes/sportsid');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'keyboar cat'
}));

// 認証ミドルウェアpassportの初期化。
app.use(passport.initialize());
app.use(passport.session()); // セッション追加

app.use(flash());

app.use('/', routes);
app.use('/users', users);
app.use('/login',login);
app.use('/watch_login',watch_login);
app.use('/watch',watch);
app.use('/cast',cast);
app.use('/createaccount',createaccount);
app.use('/sportsnames',sportsnames);
app.use('/sportsid',sportsid);
app.use('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
