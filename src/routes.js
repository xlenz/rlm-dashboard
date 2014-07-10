'use strict';

var self = this;
var api;

module.exports = function (cfg) {
    api = require('./controllers/api')(cfg);
    return self;
};

exports.routes = function (app) {
    app.get('/status/:environment', api.status);
};
