'use strict';

var passport = require('passport');
var self = this;
var User = require('./../models/User');
var cfg;

module.exports = function (_cfg) {
    cfg = _cfg;

    return self;
};

function login(req, res, next) {
    var responseData = {success: false};
    if (req.isAuthenticated()) {
        responseData.message = 'You are already logged in.';
        return res.send(responseData);
    }

    log.debug(req.body);

    if (req.body.username.length < 2 || req.body.password.length < 2) {
        responseData.message = 'Login and password length should be 3 symbols or more.';
        return res.send(responseData);
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            responseData.message = info || 'authentication failed';
            return res.send(responseData);
        }
        req.logIn(user, function (err) {
            if (err) {
                responseData.message = err || 'authentication failed';
                return res.send(responseData);
            }
            responseData = {
                success: true,
                user: {
                    id: user._id,
                    username: user.username,
                    displayName: user.displayName
                }
            };
            return res.send(responseData);
        });
    })(req, res, next);
}

exports.login = login;

exports.signup = function (req, res, next) {
    var responseData = {success: false};
    if (req.isAuthenticated()) {
        responseData.message = 'You are already logged in.';
        return res.send(responseData);
    }

    log.debug(req.body);

    if (req.body.username.length < 2 || req.body.password.length < 2) {
        responseData.message = 'Login and password length should be 3 symbols or more.';
        return res.send(responseData);
    }

    var username = req.body.username.toLowerCase();
    req.body.displayName = null;
    Object.keys(cfg.users).forEach(function (key) {
        if (key === username) {
            req.body.displayName = cfg.users[key];
        }
    });
    if (req.body.displayName === null) {
        responseData.message = 'You are not allowed to sign up.';
        return res.send(responseData);
    }

    User.saveUser(req.body, 'local', function (err, result) {
        if (err) {
            log.error(err);
            responseData.message = result || 'Signup failed.';
            return res.send(responseData);
        }
        return login(req, res, next);
    });
};

exports.logout = function (req, res, next) {
    if (req.isAuthenticated()) {
        req.logout();
    }
    res.send({success: true});
};

exports.me = function (req, res, next) {
    var responseData = {success: false};

    if (!req.isAuthenticated()) {
        responseData.message = 'Please login first.';
        return res.send(responseData);
    }

    responseData = {
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
            displayName: req.user.displayName
        }
    };
    res.send(responseData);
};
