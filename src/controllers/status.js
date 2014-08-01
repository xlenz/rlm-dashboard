'use strict';

var self = this;
var jobModel = require('./../models/JobStatus');
//var q = require('q');
var cfg, statusSync;

module.exports = function (_cfg, _statusSync) {
    cfg = _cfg;
    statusSync = _statusSync;

    return self;
};

exports.envDetail = function (req, res, next) {
    jobModel.lastJobResult(req.params.job, function (err, result) {
        res.send(result);
    });
};

exports.status = function (req, res, next) {
    var job = req.params.job.split('?')[0]; //resolve image caching

    jobModel.lastJobResult(job, function (err, result) {
        if (err) {
            log.error(err);
        }
        var img = cfg.statusError;
        if (err || result === null) {
            return res.sendfile(img);
        }

        if (result === null) {
            img = cfg.statusError;
        } else if (result.build.building === true) {
            img = cfg.statusAnime;
        } else if (result.build.result === 'SUCCESS') {
            img = cfg.statusGreen;
        } else if (result.build.result === 'ABORTED') {
            img = cfg.statusGrey;
        } else {
            img = cfg.statusRed;
        }

        res.sendfile(img);
    });

};

exports.stateSet = function (req, res, next) {
    var responseData = {success: false};
    if (!req.isAuthenticated()) {
        responseData.message = 'Please login first.';
        return res.send(responseData);
    }
    req.body.changedBy = req.user._id;
    statusSync.envStateSet(req.params.id, req.body, function (result) {
        return res.send({
            job: result.job,
            locked: result.locked,
            resolved: result.resolved,
            changedBy: result.changedBy,
            state: result.state
        });
    });
};
