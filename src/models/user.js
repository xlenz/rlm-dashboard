'use strict';

var mongoose = require('mongoose');
var Provider = require('./Providers');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    displayName: String,
    provider: mongoose.Schema.Types.ObjectId
});

userSchema.statics.findByLogin = function (username, cb) {
    this.findOne({username: username}, function (err, result) {
        if (err) {
            return log.error(err);
        }
        cb(result);
    });
};

userSchema.statics.saveUser = function (obj, providerName, cb) {
    var User = this;
    Provider.getProviderId(providerName, function (providerId) {
        obj.provider = providerId;
        User.findByLogin(obj.username, function (result) {
            if (result !== null) {
                return cb(true, 'User already exists.');
            }
            var user = new User(obj);
            user.save(cb);
        });
    });
};

module.exports = mongoose.model('Users', userSchema);
