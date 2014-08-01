'use strict';

var self = this;
var jobModel = require('./../models/JobStatus');
var q = require('q');
var cfg, statusSync;

module.exports = function (_cfg, _statusSync) {
    cfg = _cfg;
    statusSync = _statusSync;

    return self;
};

exports.envs = function (req, res, next) {
    var arr = [];
    Object.keys(cfg.environments).forEach(function (jobName) {
        delete cfg.environments[jobName].build;
        arr.push(jobModel.lastJobResult(jobName));
    });

    q.all(arr).then(function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i][0];
            var jobName = item.job;

            cfg.environments[jobName].id = item._id;
            cfg.environments[jobName].build = item.build;
            cfg.environments[jobName].rlm.build = item.rlm.build;
            cfg.environments[jobName].sbm.build = item.sbm.build;
            cfg.environments[jobName].locked = item.locked;
            cfg.environments[jobName].resolved = item.resolved;
            cfg.environments[jobName].changedBy = item.changedBy;
            cfg.environments[jobName].state = item.state;
        }

        res.send(cfg.environments);
    });

};

exports.status = function (req, res, next) {
    var job = req.params.job.split('?')[0]; //resolve image caching

    jobModel.lastJobResult(job, function (err, result) {
        if (err) {
            log.error(err);
        }
        var img = cfg.statusError;
        if (err || result === null || result.length !== 1) {
            return res.sendfile(img);
        }
        var data = result[0];

        if (data === null) {
            img = cfg.statusError;
        } else if (data.build.building === true) {
            img = cfg.statusAnime;
        } else if (data.build.result === 'SUCCESS') {
            img = cfg.statusGreen;
        } else if (data.build.result === 'ABORTED') {
            img = cfg.statusGrey;
        } else {
            img = cfg.statusRed;
        }

        res.sendfile(img);
    });

};

exports.stateSet = function (req, res, next) {
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
