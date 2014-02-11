'use strict';

//logging
global.log = require('./config/modules/winston');
var express = require('express');

//reading config file
var cfg = require('./config/readConfig').config;

var app = express();
//setup express usages
require('./config/modules/express')(app, cfg);

//start server
var server = app.listen(cfg.port, cfg.host, function () {
  var host = cfg.host || '*';
  var port = cfg.port || 'default';
  log.info('Listening - ' + host + ':' + port);
});

//routes
require('./src/routes')(cfg).routes(app);
