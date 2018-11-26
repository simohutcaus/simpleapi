var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var winston = require('winston');

require('winston-papertrail').Papertrail;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var winstonPapertrail = new winston.transports.Papertrail({
	host: 'logs2.papertrailapp.com',
	port: 29311
  })



var logger = winston.createLogger({
	transports: [winstonPapertrail]
  });

  var server = app.listen(80, function () {
    console.log("app running on port.", server.address().port);
    logger.info('nodejs started');
});
