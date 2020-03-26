// Setup ENV
require("dotenv").config();

// Tools
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const mongoose = require('mongoose');

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Http settings
const httpPort = process.env.PORT || 5000;

// Create the express app
const app = express();

// Create the serer
const httpServer = http.createServer(app);

// Connect to the database
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( () => console.log('Database established the connection.'));

const db = mongoose.connection;

db.on(
    "error",
    console.error.bind(console, Date() + " - DATABASE: Failure. " + " Error: ")
);
db.once("open", function () {
  console.log('Database connected.');
});

// Folder to INCLUDE in Express
//--------------------------------------------------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Setup tools
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add the routes to the app
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Listen for http requests
httpServer.listen(httpPort, function () {
  console.log("Server HTTP started on port: " + httpPort);
});

// Export the app
module.exports = app;
