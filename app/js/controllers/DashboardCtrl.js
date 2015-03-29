'use strict';

(function () {
    var app = angular.module('ciDashboard');

    app.controller('DashboardCtrl', function ($scope, $q, ApiClient, ActiveTab, Auth) {
        ActiveTab.set(0);

        $scope.envs = {};
        $scope.envsDetails = {};
        $scope.timestamp = new Date().getTime();

        $scope.resolve = function (env, state) {
            if (!Auth.isAuth()) {
                $('#authModal').modal('show');
                return null;
            }
            if (env.resolved === state) {
                return;
            }
            envStateSet(env._id, {
                resolved: state,
                locked: false
            });
        };

        $scope.lock = function (env) {
            if (!Auth.isAuth()) {
                $('#authModal').modal('show');
                return null;
            }
            envStateSet(env._id, {
                locked: !env.locked
            });
        };

        $scope.isBuilding = function (env) {
            return env.build ? env.build.building : false;
        };

        $scope.isLocked = function (env) {
            return env.locked;
        };

        $scope.details = function (env) {
            var anonymous = 'Anonymous';
            if (env.build && env.build.building === true) {
                return 'Building';
            }
            if (env.resolved === undefined && env.locked === undefined) {
                return 'Last job result: ' + (env.build ? env.build.result : null);
            }
            if (env.locked === true) {
                return 'Locked by ' + env.changedBy || anonymous;
            }
            if (env.resolved === true) {
                return 'Fixed by ' + env.changedBy || anonymous;
            }
            if (env.resolved === false) {
                return 'Failed by ' + env.changedBy || anonymous;
            }
            if (env.locked === false) {
                return 'Unlocked by ' + env.changedBy || anonymous;
            }
        };

        $scope.user = {};
        $scope.authFailed = null;
        $scope.authType = 'login';

        $scope.setAuthType = function (type) {
            $scope.authType = type;
        };

        $scope.fSubmit = function (authType) {
            if (!$scope.authForm.$valid) {
                return;
            }
            authType = authType ? authType : $scope.authType;
            if (authType === 'login') {
                $scope.login();
            }
            else if (authType === 'signup') {
                $scope.signup();
            }
            else {
                console.error('Unkonwn auth type.');
            }
        };
        $scope.login = function () {
            ApiClient.login($scope.user).then(
                    function (data) {
                        console.log(data);
                        if (data.success === false) {
                            return $scope.authFailed = data.message;
                        }
                        Auth.setUser(data.user);
                        $scope.authFailed = null;
                        $('#authModal').modal('hide');
                    },
                    function (error) {
                        $scope.authFailed = error.message || error;
                    }
            );
        };

        $scope.signup = function () {
            ApiClient.signup($scope.user).then(function (data) {
                console.log(data);
                if (data.success === false) {
                    return $scope.authFailed = data.message;
                }
                Auth.setUser(data.user);
                $scope.authFailed = null;
                $('#authModal').modal('hide');
            }, function (error) {
                $scope.authFailed = error.message || error;
            });
        };

        function getEnvs() {
            ApiClient.environments().then(function (data) {
                $scope.timestamp = new Date().getTime();
                $scope.envs = data;

                envsDetail();
            });
        }

        function envsDetail() {
            $scope.timestamp = new Date().getTime();

            var arr = [];
            Object.keys($scope.envs).forEach(function (key) {
                arr.push(ApiClient.envDetail(key));
            });

            $q.all(arr).then(function (data) {
                angular.forEach(data, function (env) {
                    if (!env) return;
                    //Notification
                    if ($scope.envs[env.job].build !== undefined) {
                        var result = env.build.result ? env.build.result : 'Building';
                        if ($scope.envs[env.job]._id !== env._id || $scope.envs[env.job].build.result !== env.build.result) {
                            var notification = new Notification($scope.envs[env.job].name, {body: result});
                            setTimeout(function () {
                                notification.close();
                            }, 15000);
                        }
                    }

                    cleanupStateFields(env.job);
                    if ($scope.envs[env.job].builds) {
                        delete $scope.envs[env.job].builds;
                    }

                    Object.keys(env).forEach(function (key) {
                        $scope.envs[env.job][key] = env[key];
                        var regex = /QA_(.*)_AUTOCONFIG/;
                        var matches = env.job.match(regex);
                        $scope.envs[env.job]['solutionType'] = matches[1];
                    });
                });

            });
        }

        getEnvs();

        function envStateSet(id, body) {
            ApiClient.envStateSet(id, body).then(function (data) {
                var jobName = data.job;
                delete data.job;
                cleanupStateFields(jobName);
                Object.keys(data).forEach(function (key) {
                    $scope.envs[jobName][key] = data[key];
                });
            });
        }

        function cleanupStateFields(jobName) {
            delete $scope.envs[jobName].resolved;
            delete $scope.envs[jobName].locked;
            delete $scope.envs[jobName].changedBy;
        }

        setInterval(envsDetail, 15000);

    });
})();
