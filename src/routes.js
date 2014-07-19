'use strict';

var self = this;
var jobStatus, config, html, auth;
var passport = require('passport');

module.exports = function (cfg, statusSync) {
    jobStatus = require('./controllers/status')(cfg, statusSync);
    config = require('./controllers/config')(cfg);
    html = require('./controllers/html')(cfg);
    auth = require('./controllers/auth')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', jobStatus.status);
    app.get('/state/:job', jobStatus.stateGet);
    app.post('/state/:job', jobStatus.stateSet);
    app.get('/environments', config.envs);
    app.get('/tabs', config.tabs);
    app.get('/', html.appHtml);
    app.post('/login', passport.authenticate('local'), auth.login);
    app.get('/api/users/me', passport.authenticate('basic', { session: false }), auth.me);
};
