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
    builds: {
        sol: String,
        sbm: String
    }
});

jobStatusSchema.statics.findJob = function(job, buildNumber, cb) {
    this.findOne({
        job: job,
        'build.number': buildNumber
    }, cb);
};

jobStatusSchema.statics.lastJobResult = function(job, cb) {
    return this.find({
        job: job
    }).limit(1).sort({
        'build.date': -1
    }).exec(function(err, result) {
        if (err || result.length !== 1) {
            return cb(err, null);
        }

        if (result[0].lastTransition === undefined) {
            return cb(err, result[0]);
        } else {
            Transition.findById(result[0].lastTransition, function(errTransition, transition) {
                if (transition === null) {
                    return cb(errTransition, result[0]);
                }
                result[0]._doc.locked = transition.locked;
                result[0]._doc.resolved = transition.resolved;
                User.findById(transition.changedBy, function(errUser, user) {
                    if (user === null) {
                        return cb(errUser, result[0]);
                    }
                    result[0]._doc.changedBy = user.displayName || user.username;
                    return cb(errUser, result[0]);
                });
            });
        }
    });
};

jobStatusSchema.statics.cleanUp = function() {
    this.find().sort({
        '_id': -1
    }).skip(100).exec(function(err, docs) {
        log.info('Builds to cleanup: ' + docs.length);
        docs.forEach(function(doc) {
            doc.remove();
        });
    });
};

var jobStatus = mongoose.model('environmentStatus', jobStatusSchema);

module.exports = jobStatus;
