'use strict';

//logging
global.log = require('./config/modules/winston');
var express = require('express');

//reading config file
var cfg = require('./config/config')();

var app = express();
//routes
var routes = require('./src/routes')(cfg);

//setup express usages
require('./config/modules/express')(app, routes);

//start server
app.listen(cfg.port, cfg.host, function () {
    var host = cfg.host || '*';
    var port = cfg.port || 'default';
    log.info('Listening - ' + host + ':' + port);
});
