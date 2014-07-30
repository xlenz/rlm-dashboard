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
            return log.debug('Cannot parse JSON response from Jenkins.');
        }

        jobModel.findJob(jobName, data.number, function (err, result) {
            if (err) {
                return log.error(err);
            }

            var build = {
                building: data.building,
                number: data.number,
                date: new Date(data.timestamp),
                result: data.result
            };

            if (result !== null) {
                saveRlmBuild(result._id, data.fullDisplayName);

                if (result.build.building === true && data.building === false) {
                    jobModel.findByIdAndUpdate({_id: result._id}, {
                        'build.building': data.building,
                        'build.result': data.result
                    }, function (err, updated) {
                        if (err) {
                            return log.error(err);
                        }
                        setState(updated);
                    });
                }

                return;
            }

            var env = new jobModel({
                job: jobName,
                build: build
            });

            env.save(function (err, saved) {
                if (err) {
                    return log.error(err);
                }

                setState(saved);
                saveRlmBuild(saved._id, data.fullDisplayName);
            });
        });

    });
}

function parseRlmBuild(fullDisplayName) {
    var buildName = fullDisplayName.split(' ')[1];
    if (buildName.indexOf(';') !== -1) {
        var builds = buildName.split(';');
        return {
            rlmBuild: 'b' + builds[0].substr(3),
            sbmBuild: 'b' + builds[1].substr(3)
        };
    } else {
        return null;
    }
}

function saveRlmBuild(id, fullDisplayName) {
    var rlmSbmBuild = parseRlmBuild(fullDisplayName);

    if (rlmSbmBuild !== null) {
        jobModel.update({_id: id}, {
            rlm: {build: rlmSbmBuild.rlmBuild},
            sbm: {build: rlmSbmBuild.sbmBuild}
        }, function (err) {
            if (err) {
                return log.error(err);
            }
        });
    }
}

function setState(data, callback) {
    var state;

    if (data.build.building === true) {
        state = 'Building';
    } else if (data.locked === true) {
        state = 'Locked';
    } else if (data.resolved === true || (data.build.result === 'SUCCESS' && data.resolved !== false)) {
        state = 'Ok';
    } else if (data.build.result === 'ABORTED' && (data.resolved === undefined || data.resolved === null)) {
        state = 'Aborted';
    } else {
        state = 'Failed';
    }

    jobModel.findByIdAndUpdate({_id: data._id}, {
        state: state
    }, function (err, updated) {
        if (err) {
            return log.error(err);
        }
        if (callback) {
            callback(updated);
        }
    });
}

function envStateSet(id, data, callback) {
    jobModel.findById(id, function (err, result) {
        if (result.build.building === false && (result.locked !== true || data.locked !== undefined)) {
            jobModel.findByIdAndUpdate({_id: id}, data, function (err, updated) {
                if (err) {
                    return log.error(err);
                }
                setState(updated, function (final) {
                    callback(final);
                });
            });
        }
        else {
            callback();
        }
    });
}

exports.jobStatus = jobStatus;
exports.envStateSet = envStateSet;
