'use strict';

var self = this;
var api, html;

module.exports = function (cfg, statusSync) {
    api = require('./controllers/api')(cfg, statusSync);
    html = require('./controllers/html')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', api.status);
    app.get('/', html.appHtml);
};
