'use strict';

var self = this;
var cfg = null;

module.exports = function (_cfg) {
    cfg = _cfg;
    return self;
};

exports.envs = function (req, res, next) {
    return res.send(cfg.environments);
};

exports.tabs = function (req, res, next) {
    return res.send(cfg.tabs);
};
