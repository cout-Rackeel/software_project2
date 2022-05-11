const port = process.env.PORT || 8080;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayout = require('express-ejs-layouts')


var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var mysql = require('mysql');

//Setup External Files
var connection = require('./lib/db')
var indexRouter = require('./routes/index');
var projectRouter = require('./routes/projects');
var noteRouter = require('./routes/notes')

var app = express();

// Setup the Views Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SETTING LAYOUT
app.set('layout', 'layouts/layout')
app.use(expressLayout)



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// SESSION SETTINGS
app.use(cookieParser());
app.use(session({
  secret: 'secret code 3245',
  resave: false ,
  saveUninitialized: true,
  cookie: {maxAge:120000}
}));



app.use(flash());
 
//ROUTE USAGES
 app.use('/', indexRouter);
 app.use('/projects',projectRouter)
 app.use('/notes',noteRouter)



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port, ()=> { console.log(`Listening on port ${port}..`);})

module.exports = app;
