'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cfg;

module.exports = function (app, _cfg, routes) {
    cfg = _cfg;
    var pathToPublic = cfg.pathToApp;
    app.use(logWho);
    //app.use(express.cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static(pathToPublic));
    routes.routes(app);
    app.use(pageNotFound);
    app.use(internalServerError);
};

function logWho(req, res, next) {
    var who = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    log.info(who + ' requests: ' + req.headers.host + req.url);
    next();
}

function pageNotFound(req, res, next) {
    res.status(404);
    log.warn('Not found URL: ' + req.url);
    var page404 = cfg.pageNotFound;
    if (req.method === 'GET') {
        return res.sendfile(page404);
    }
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
