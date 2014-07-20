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
            envStateGet(jobName);
            return log.error('Cannot parse JSON response from Jenkins.');
        }

        jobModel.findJob(jobName, data.number, function (err, result) {
            if (err) {
                return log.error(err);
            }

            if (result !== null) {
                var build = parseRlmBuild(data.fullDisplayName);
                if (build !== null) {
                    cfg.environments[jobName].rlm.build = build.rlmBuild;
                    cfg.environments[jobName].sbm.build = build.sbmBuild;
                }

                cfg.environments[jobName].result = data.result;
                setState(jobName, checkState(jobName, result));

                if (result.isBuilding === true && data.building === false) {
                    jobModel.update({_id: result._id}, {
                        isBuilding: data.building, result: data.result}, function (err, updated) {
                        if (err) {
                            return log.error(err);
                        }
                        setState(jobName, checkState(jobName, updated));
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

            env.save(function (err, saved) {
                if (err) {
                    return log.error(err);
                }

                setState(jobName, checkState(jobName, saved));
                cfg.environments[jobName].result = saved.result;
            });
        });

    });
}

function parseRlmBuild(fullDisplayName) {
    var buildName = fullDisplayName.split(' ')[1];
    if (buildName.indexOf(';') !== -1) {
        var builds = buildName.split(';');
        return {
            rlmBuild: builds[0].substr(3),
            sbmBuild: builds[1].substr(3)
        };
    } else {
        return null;
    }
}

function envStateGet(jobName, callback) {
    jobModel.lastJobResult(jobName, function (err, result) {
        if (err) {
            return log.error(err);
        }
        if (result === null || result.length !== 1) {
            return callback ? callback(null) : null;
        }

        var state = checkState(jobName, result[0]);
        setState(jobName, state);

        if (callback) {
            callback(state);
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
        cfg.environments[jobName].id = state.id;
        cfg.environments[jobName].state = state.state;
    }
}

exports.jobStatus = jobStatus;
exports.envStateGet = envStateGet;
exports.envStateSet = envStateSet;
