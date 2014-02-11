'use strict';

var self = this;
var html, api;

module.exports = function (cfg, dbMysql) {
  //var api = require('./controllers/api')();
  html = require('./controllers/html')(cfg);
  return self;
};

exports.routes = function (app) {
  app.get("/", html.rootHtml);
};
