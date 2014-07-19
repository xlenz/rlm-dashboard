'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    provider: String,
    id: String,
    displayName: String

});

var userSchema = mongoose.model('users', userSchema);

module.exports = userSchema;
