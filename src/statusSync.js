'use strict';

var jobModel = require('./models/jobStatus');
var request = require('request');
var self = this;
var cfg;

module.exports = function (_cfg) {
    cfg = _cfg;

    setInterval(function () {
        log.debug('Getting jobs state...');
        Object.keys(cfg.environments).forEach(function (key) {
            jobStatus(key);
        });
    }, 60000);

    return self;
};

function jobStatus(jobName, callback) {
    var uri = cfg.jenkinsUrl + '/job/' + jobName + '/lastBuild/api/json';
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

        jobModel.findJob(jobName, data.number, function (err, result) {
            if (err) {
                return log.error(err);
            }
            if (result !== null) {
                if (result.isBuilding === true && data.building === false) {
                    jobModel.update({_id: result._id}, {
                        isBuilding: data.building, result: data.result}, function (err) {
                        if (err) {
                            return log.error(err);
                        }
                    });
                }
                return log.debug('Env`s build already exists.');
            }

            var env = new jobModel({
                job: jobName,
                isBuilding: data.building,
                build: data.number,
                date: new Date(data.timestamp),
                result: data.result
            });

            env.save(function (err) {
                if (err) {
                    return log.error(err);
                }
            });
        });

        return callback ? callback(data) : null;
    });
}

function envStateGet(jobName, callback) {
    jobModel.lastJobResult(jobName, function (err, result) {
        if (err) {
            return log.error(err);
        }
        callback(result);
    });
}

function envStateSet(data, callback) {
    var id = data.id;
    delete(data.id);

    jobModel.findOne({_id: id}, function (err, result) {
        console.log(result.isBuilding === false, result.locked !== true, data.locked !== undefined);
        if (result.isBuilding === false && (result.locked !== true || data.locked !== undefined)) {
            jobModel.update({_id: id}, data, function (err) {
                if (err) {
                    return log.error(err);
                }
                callback();
            });
        }
        else {
            callback();
        }
    });
}

exports.jobStatus = jobStatus;
exports.envStateGet = envStateGet;
exports.envStateSet = envStateSet;
