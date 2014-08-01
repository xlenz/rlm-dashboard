'use strict';

var self = this;
var cfg = null;

module.exports = function (_cfg) {
    cfg = _cfg;
    return self;
};

exports.tabs = function (req, res, next) {
    return res.send(cfg.tabs);
};

exports.envs = function (req, res, next) {
    return res.send(cfg.environments);
};
