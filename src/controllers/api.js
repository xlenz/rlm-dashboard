'use strict';

var request = require('request');
var self = this;
var cfg;

module.exports = function (_cfg) {
    cfg = _cfg;

    return self;
};

exports.status = function (req, res, next) {
    var env = req.params.environment;
    var uri = cfg.jenkinsUrl + '/job/' + cfg.jobPreffix + env + cfg.jobSuffix + '/lastBuild/api/json';
    log.info(env);
    log.info(uri);
    request({
       method: 'GET',
       uri: uri
    }, function (e, r, body) {
        var data = null;
        try {
            data = JSON.parse(body);
            var result = data.result;
            var building = data.building;
        } catch (e) {
            log.error('Cannot parse JSON response.')
        }
        var img;

        if (data === null){
            img = cfg.statusError;
        } else if (building === true) {
            img = cfg.statusGreyAnime;
        } else if (result === 'SUCCESS') {
            img = cfg.statusGreen;
        } else {
            img = cfg.statusRed;
        }
        res.redirect(cfg.jenkinsUrl + img);
    });
};
