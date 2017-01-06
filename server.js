// setup//
var express = require ('express');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./config/routes');

// dependencies//
var bodyParser = require('body-parser');

// middleware//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(routes);

// start server//
app.listen(port, function() {
	console.log('Server started on' + port);
});
