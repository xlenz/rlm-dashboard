'use strict';

var self = this;
var jobStatus, envs, html;

module.exports = function (cfg, statusSync) {
    jobStatus = require('./controllers/status')(cfg, statusSync);
    envs = require('./controllers/envs')(cfg);
    html = require('./controllers/html')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', jobStatus.status);
    app.get('/environments', envs.envs);
    app.get('/', html.appHtml);
};
