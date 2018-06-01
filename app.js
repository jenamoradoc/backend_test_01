var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var middleware = require('./middleware/authentication');

var index = require('./routes/index');

var app = express();

//Set cots header and intercept "Options" preflight from call of Angularjs
var allowCrossDomain = function(req, res, next){
    // res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if (req.method == "OPTIONS")
    res.sendStatus(200);
        else
             next();

}
app.use(allowCrossDomain);

//bodyParser & favicon
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*function checkToken(req, res, next){
  console.log("ENTRE check");
  console.log("Headers: ", JSON.stringify(req.headers));
  // return next();
  console.log("TOKEN: " + JSON.stringify(req.headers.authorization));
  if (req.headers.authorization) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

//app.use('/static', checkToken, express.static(__dirname + '/uploadfiles/uploads'));
*/
app.use('/static',middleware.ensureAuthenticated, express.static(__dirname + '/uploadfiles/uploads'));

app.use('/', index);

//catch 404 & handler forward to error
app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
