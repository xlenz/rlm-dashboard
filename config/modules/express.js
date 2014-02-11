'use strict';

var express = require('express');

module.exports = function (app, cfg) {
  var pathToPublic = __dirname + '/../../app';
  app.configure(function () {
    app.use(logWho);
    app.use(express.logger('dev'));
    // app.use(express.json());
    // app.use(express.urlencoded());
    app.use(app.router);
    app.use(express.static(pathToPublic));
    app.use(pageNotFound);
    app.use(internalServerError);
  });
};

function logWho(req, res, next) {
  var who = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.debug(who + ' requests: ' + req.headers.host + req.url);
  next();
}

function pageNotFound(req, res, next) {
  res.status(404);
  log.warn('Not found URL: ' + req.url);
  return res.send({
    error: 'Resource not found',
    code: 404
  });
}

function internalServerError(err, req, res, next) {
  res.status(err.status || 500);
  log.error('Internal error(%d): %s', res.statusCode, err.message);
  log.debug('req.body:\n', req.body);
  return res.send({
    error: err.message,
    code: 500
  });
}
