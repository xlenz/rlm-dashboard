'use strict';

var mongoose = require('mongoose');

var jobStatusSchema = mongoose.Schema({
    job: String,
    isBuilding: Boolean,
    build: Number,
    date: Date,
    result: String,
    resolved: Boolean,
    locked: Boolean,
    lockedBy: String
});

jobStatusSchema.statics.findJob = function (job, build, cb) {
    this.findOne({
        job: job,
        build: build
    }, cb);
};

jobStatusSchema.statics.lastJobResult = function (job, cb) {
    this.find({
        job: job
    }).limit(1).sort('-date').exec(cb);
};

var jobStatus = mongoose.model('environmentStatus', jobStatusSchema);

module.exports = jobStatus;

