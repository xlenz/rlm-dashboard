'use strict';

var mongoose = require('mongoose');

var envStatusSchema = mongoose.Schema({
    environment: String,
    isBuilding: Boolean,
    build: Number,
    date: Date,
    result: String,
    resolved: Boolean,
    locked: Boolean,
    lockedBy: String
});

envStatusSchema.statics.findEnv = function (env, build, cb) {
    this.findOne({
        environment: env,
        build: build
    }, cb);
};

var envStatus = mongoose.model('environmentStatus', envStatusSchema);

module.exports = envStatus;

