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
    if (req.isAuthenticated()) {
        return res.send('You are already logged in.');
    }
    var responseData = {success: false};
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
                    username: user.username
                }
            };
            return res.send(responseData);
        });
    })(req, res, next);
}

exports.login = login;

exports.signup = function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.send('You are already logged in.');
    }

    var response = {success: false};
    log.debug(req.body);

    if (req.body.username.length < 2 || req.body.password.length < 2) {
        response.message = 'Login and password length should be 3 symbols or more.';
        return res.send(response);
    }

    User.saveUser(req.body, 'local', function (err, result) {
        if (err) {
            log.error(err);
            response.message = result || 'Signup failed.';
            return res.send(response);
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
