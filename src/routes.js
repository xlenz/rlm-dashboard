'use strict';

var self = this;
var jobStatus, config, html, auth;

module.exports = function (cfg, statusSync) {
    jobStatus = require('./controllers/status')(cfg, statusSync);
    config = require('./controllers/config')(cfg);
    html = require('./controllers/html')(cfg);
    auth = require('./controllers/auth')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', jobStatus.status);
    app.post('/state/:id', jobStatus.stateSet);
    app.get('/environments', config.envs);
    app.get('/env/:job', jobStatus.envDetail);
    app.get('/tabs', config.tabs);
    app.get('/', html.appHtml);
    app.post('/login', auth.login);
    app.post('/signup', auth.signup);
    app.post('/logout', auth.logout);
    app.get('/me', auth.me);
};
