'use strict';

var envStatus = require('./models/environmentStatus');
var request = require('request');
var self = this;
var cfg;

module.exports = function (_cfg) {
    cfg = _cfg;

    setInterval(function () {
        log.info('Getting jobs state...');
        cfg.environments.forEach(function (el) {
            envState(el.name);
        });
    }, 60000);

    return self;
};

function envState(env, callback) {
    var uri = cfg.jenkinsUrl + '/job/' + cfg.jobPreffix + env + cfg.jobSuffix + '/lastBuild/api/json';
    if (callback) {
        log.info(uri);
    }
    request({
        method: 'GET',
        uri: uri
    }, function (e, r, body) {
        var data = null;
        try {
            data = JSON.parse(body);
        } catch (e) {
            log.error('Cannot parse JSON response.');
            return callback ? callback(data) : null;
        }

        envStatus.findEnv(env, data.number, function (err, result) {
            if (err) {
                return log.error(err);
            }
            if (result !== null) {
                if (result.isBuilding === true && data.building === false) {
                    envStatus.update({_id: result._id}, {
                        isBuilding: data.building, result: data.result}, function (err) {
                        if (err) {
                            return log.error(err);
                        }
                    });
                }
                return log.debug('Env`s build already exists.');
            }

            var envObj = new envStatus({
                environment: env,
                isBuilding: data.building,
                build: data.number,
                date: new Date(data.timestamp),
                result: data.result
            });

            envObj.save(function (err) {
                if (err) {
                    return log.error(err);
                }
            });
        });

        return callback ? callback(data) : null;
    });
}

exports.envState = envState;
