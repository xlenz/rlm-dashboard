'use strict';

var self = this;
var cfg, statusSync;

module.exports = function (_cfg, _statusSync) {
    cfg = _cfg;
    statusSync = _statusSync;

    return self;
};

exports.status = function (req, res, next) {
    var env = req.params.environment;
    statusSync.envState(env, function (data) {
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
