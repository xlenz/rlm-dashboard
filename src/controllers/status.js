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

function stateGet(req, res, next) {
    statusSync.envStateGet(req.params.job, function (result) {
        if (result === null || result.length !== 1) {
            return res.send(null);
        }
        var data = result[0];
        var state = {
            id: result[0]._id,
            job: req.params.job
        };

        if (data.isBuilding === true) {
            state.state = 'building';
        } else if (data.locked === true) {
            state.state = 'locked';
        } else if (data.resolved === true || (data.result === 'SUCCESS' && data.resolved !== false)) {
            state.state = 'ok';
        } else if (data.result === 'ABORTED' && (data.resolved === undefined || data.resolved === null)) {
            state.state = 'abort';
        } else {
            state.state = 'fail';
        }

        return res.send(state);
    });
}
exports.stateGet = stateGet;

exports.stateSet = function (req, res, next) {
    statusSync.envStateSet(req.body, function () {
        //return res.redirect('/state/' + req.param.job);
        stateGet(req, res, next);
    });
};
