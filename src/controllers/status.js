'use strict';

var self = this;
var cfg, statusSync;

module.exports = function (_cfg, _statusSync) {
    cfg = _cfg;
    statusSync = _statusSync;

    return self;
};

exports.status = function (req, res, next) {
    var job = req.params.job;
    log.info('Getting status for: ', job);
    statusSync.jobStatus(job, function (data) {
        var img;

        if (data === null) {
            img = cfg.statusError;
        } else if (data.building === true) {
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

exports.state = function (req, res, next) {
    statusSync.envState(req.params.job, function (result) {
        var state;

        if (result === null || result.length !== 1) {
            state = null;
        } else if (result[0].isBuilding === true) {
            state = 'building';
        } else if (result[0].locked === true) {
            state = 'locked';
        } else if (result[0].result === 'SUCCESS' || result[0].resolved === true) {
            state = 'ok';
        } else if (result[0].result === 'ABORTED' && result[0].resolved === undefined) {
            state ='abort';
        } else {
            state = 'fail';
        }

        return res.send(state);
    });
};
