var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;

console.log(port);

// connect to the database and load models
require('./server/models').connect(config.dbUri);


// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());

io.on('connection', function(socket) {


	// window.open("http://localhost:3000/", "chat-co", "width=500, height=600")

	// reconnect: false;
	console.log("Connected 1");
	socket.on("new-message", function(msg){

		//console.log(msg);
		io.emit("receive-message", msg);

	})
	socket.on("test", function(){
		console.log("mounted");
	})
});

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});
