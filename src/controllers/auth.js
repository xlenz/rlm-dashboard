'use strict';

var self = this;
var User = require('./../models/user');
var cfg, User;

module.exports = function (_cfg) {
    cfg = _cfg;

    return self;
};

exports.login = function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  };

exports.me = function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  };

