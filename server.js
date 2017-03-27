// Manager: Simple CMS
// Ankit Patil
// server.js

var compression = require('compression');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// DB config
mongoose.connect(configDB.url);

// Passport config
require('./config/passport')(passport);

// Express app setup
app.use(express.static(__dirname + '/static'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Passport config
app.use(session({'secret': 'testsecretforpassport'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(compression());

// routes
require('./app/routes.js')(app, passport);

// launch
app.listen(port);
console.log('App running on port ' + port);
