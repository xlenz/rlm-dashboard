'use strict';

var jobModel = require('./models/jobStatus');
var request = require('request');
var self = this;
var cfg;

module.exports = function (_cfg) {
    cfg = _cfg;

    Object.keys(cfg.environments).forEach(function (key) {
        jobStatus(key);
    });

    setInterval(function () {
        log.debug('Getting jobs state...');
        Object.keys(cfg.environments).forEach(function (key) {
            jobStatus(key);
        });
    }, 15000);

    return self;
};

function jobStatus(jobName) {
    var uri = cfg.jenkinsUrl + '/job/' + jobName + '/lastBuild/api/json';
    request({
        method: 'GET',
        uri: uri
    }, function (e, r, body) {
        var data = null;
        try {
            data = JSON.parse(body);
        } catch (e) {
            return log.error('Cannot parse JSON response.');
        }

        jobModel.findJob(jobName, data.number, function (err, result) {
            if (err) {
                return log.error(err);
            }

            setState(jobName, checkState(jobName, result));
            cfg.environments[jobName].id = result._id;

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

    });
}

function envStateGet(jobName, callback) {
    jobModel.lastJobResult(jobName, function (err, result) {
        if (err) {
            return log.error(err);
        }
        if (result === null || result.length !== 1) {
            return callback(null);
        }

        if (callback) {
            callback(checkState(jobName, result[0]));
        }
    });
}

function checkState(jobName, data) {

    var state = {
        id: data._id,
        job: jobName
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

    return state;
}

function envStateSet(data, callback) {
    var id = data.id;
    delete(data.id);

    jobModel.findOne({_id: id}, function (err, result) {

        if (result.isBuilding === false && (result.locked !== true || data.locked !== undefined)) {
            jobModel.update({_id: id}, data, function (err) {
                if (err) {
                    return log.error(err);
                }
                envStateGet(result.job, function (state) {
                    setState(result.job, state);
                });
                callback();
            });
        }
        else {
            callback();
        }
    });
}

function setState(jobName, state) {
    if (state !== null) {
        cfg.environments[jobName].state = state.state;
    }
}

exports.jobStatus = jobStatus;
exports.envStateGet = envStateGet;
exports.envStateSet = envStateSet;
