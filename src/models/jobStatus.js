'use strict';

var mongoose = require('mongoose');

var jobStatusSchema = mongoose.Schema({
    job: String,
    build: {
        number: Number,
        date: Date,
        building: Boolean,
        result: String
    },
    resolved: Boolean,
    locked: Boolean,
    changedBy: String,
    state: String,
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
    }).limit(1).sort({'build.date': -1}).exec(cb);
};

var jobStatus = mongoose.model('environmentStatus', jobStatusSchema);

module.exports = jobStatus;

