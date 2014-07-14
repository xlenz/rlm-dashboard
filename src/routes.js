'use strict';

var self = this;
var jobStatus, config, html;

module.exports = function (cfg, statusSync) {
    jobStatus = require('./controllers/status')(cfg, statusSync);
    config = require('./controllers/config')(cfg);
    html = require('./controllers/html')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', jobStatus.status);
    app.get('/environments', config.envs);
    app.get('/tabs', config.tabs);
    app.get('/', html.appHtml);
};
