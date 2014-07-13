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

var jobStatus = mongoose.model('environmentStatus', jobStatusSchema);

module.exports = jobStatus;

