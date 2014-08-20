'use strict';

var jobModel = require('./models/JobStatus');
var Transition = require('./models/Transitions');
var User = require('./models/User');
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
        for (var i = 0; i < builds.length; i++) {
            var build = builds[i].substr(3);
            builds[i] = (build === 'Installed') ? null : ('b' + build);
        }
        return {
            rlmBuild: builds[0],
            sbmBuild: builds[1]
        };
    } else {
        return null;
    }
}

function saveRlmBuild(id, fullDisplayName) {
    var rlmSbmBuild = parseRlmBuild(fullDisplayName);

    if (rlmSbmBuild !== null) {
        jobModel.update({_id: id}, {
            builds: {
                rlm: rlmSbmBuild.rlmBuild,
                sbm: rlmSbmBuild.sbmBuild
            }
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
    } else if (data.build.result === 'ABORTED' && data.resolved === undefined) {
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
            console.log(data.changedBy);
            User.findById(data.changedBy, function (errUser, user) {
                updated.changedBy = user.displayName || user.username;
                updated.locked = data.locked;
                updated.resolved = data.resolved;
                callback(updated);
            });
        }
    });
}

function envStateSet(id, data, callback) {
    jobModel.findById(id, function (err, result) {
        if (result.build.building === true) {
            if (err) {
                log.error(err);
            }
            return callback();
        }
        data.environmentStatus = id;
        data.previousTransition = result.lastTransition;

        var transition = new Transition(data);
        transition.save(function (errSave, saved) {
            if (errSave) {
                return log.error(errSave);
            }

            if (result.lastTransition !== undefined && data.locked === false && data.resolved === undefined) {
                Transition.findById(result.lastTransition, function (prevFind, prevTransition) {
                    if (prevFind) {
                        return log.error(prevFind);
                    }
                    if (prevTransition.previousTransition === undefined) {
                        setStateAndLastTransition(id, saved._id, saved, callback);
                    } else {
                        Transition.findById(prevTransition.previousTransition, function (errFind, foundTransition) {
                            if (errFind) {
                                return log.error(errFind);
                            }
                            setStateAndLastTransition(id, foundTransition._id, foundTransition, callback);
                        });
                    }
                });
            } else {
                setStateAndLastTransition(id, saved._id, saved, callback);
            }

        });

    });
}

function setStateAndLastTransition(id, lastTransitionId, transition, callback) {
    jobModel.findByIdAndUpdate({_id: id}, {lastTransition: lastTransitionId}, function (errUpdate, updated) {
        if (errUpdate) {
            return log.error(errUpdate);
        }
        transition.build = updated.build;
        transition._id = updated._id;
        setState(transition, function (final) {
            callback(final);
        });
    });
}

exports.jobStatus = jobStatus;
exports.envStateSet = envStateSet;
