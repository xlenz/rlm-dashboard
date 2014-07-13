'use strict';

var self = this;
var api;

module.exports = function (cfg, statusSync) {
    api = require('./controllers/api')(cfg, statusSync);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:job', api.status);
};
