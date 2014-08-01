'use strict';

var mongoose = require('mongoose');
var Transition = require('./Transitions');
var User = require('./User');

var jobStatusSchema = mongoose.Schema({
    job: String,
    build: {
        number: Number,
        date: Date,
        building: Boolean,
        result: String
    },
    state: String,
    lastTransition: mongoose.Schema.Types.ObjectId,
    rlm: {
        build: String
    },
    sbm: {
        build: String
    }
});

jobStatusSchema.statics.findJob = function (job, buildNumber, cb) {
    this.findOne({
        job: job,
        'build.number': buildNumber
    }, cb);
};

jobStatusSchema.statics.lastJobResult = function (job, cb) {
    return this.find({
        job: job
    }).limit(1).sort({'build.date': -1}).exec(function (err, result) {
        if (err || result.length !== 1) {
            return cb;
        }
        var envStatus = result[0];
        if (envStatus.lastTransition === undefined) {
            return cb;
        }
        Transition.findById(envStatus.lastTransition, function (errTransition, transition) {
            result[0].locked = transition.locked;
            result[0].resolved = transition.resolved;
            result[0]._doc_.resolved = transition.resolved;
            User.findById(transition.changedBy, function (errUser, user){
                result[0].changedBy = user.displayName || user.username;
                return cb(err, result);
            });
        });
    });
};

var jobStatus = mongoose.model('environmentStatus', jobStatusSchema);

module.exports = jobStatus;

