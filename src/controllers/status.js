'use strict';

var self = this;
var jobModel = require('./../models/jobStatus');
var cfg, statusSync;

module.exports = function (_cfg, _statusSync) {
    cfg = _cfg;
    statusSync = _statusSync;

    return self;
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
        } else if (data.isBuilding === true) {
            img = cfg.statusAnime;
        } else if (data.result === 'SUCCESS') {
            img = cfg.statusGreen;
        } else if (data.result === 'ABORTED') {
            img = cfg.statusGrey;
        } else {
            img = cfg.statusRed;
        }

        res.sendfile(img);
    });

};

function stateGet(req, res, next) {
    statusSync.envStateGet(req.params.job, function (result) {

        return res.send(result);
    });
}
exports.stateGet = stateGet;

exports.stateSet = function (req, res, next) {
    statusSync.envStateSet(req.body, function () {

        stateGet(req, res, next);
    });
};
