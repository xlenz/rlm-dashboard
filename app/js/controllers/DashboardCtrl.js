'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, $q, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = {};
        $scope.timestamp = new Date().getTime();

        $scope.resolve = function (env, state) {
            if (env.resolved === state) {
                return;
            }
            envStateSet(env.id, {
                resolved: state,
                locked: false
            });
        };

        $scope.lock = function (env) {
            envStateSet(env.id, {
                locked: !env.locked
            });
        };

        $scope.isBuilding = function (env) {
            return env.build.building;
        };

        $scope.isLocked = function (env) {
            return env.locked;
        };

        $scope.details = function (env) {
            var anonymous = 'Anonymous';
            if (env.build.building === true) {
                return 'Building';
            }
            if (env.resolved === undefined && env.locked !== true) {
                return 'Last job result: ' + env.build.result;
            }
            if (env.locked === true) {
                return 'Locked by ' + anonymous;
            }
            if (env.resolved === true) {
                return 'Fixed by ' + anonymous;
            }
            if (env.resolved === false) {
                return 'Failed by ' + anonymous;
            }
        };

        function getEnvs() {
            ApiClient.environments().then(
                    function (data) {
                        $scope.timestamp = new Date().getTime();
                        //console.log(data);

                        Object.keys($scope.envs).forEach(function (key) {
                            var env = data[key];

                            //Notification
                            var result = env.build.result ? env.build.result : 'Building';
                            if ($scope.envs[key].id !== env.id || $scope.envs[key].build.result !== env.build.result) {
                                var notification = new Notification($scope.envs[key].name, {body: result});
                                setTimeout(function () {
                                    notification.close();
                                }, 15000);
                            }
                        });

                        $scope.envs = data;
                    }
            );
        }

        getEnvs();

        function envStateSet(id, body) {
            ApiClient.envStateSet(id, body).then(function (data) {
                var jobName = data.job;
                delete data.job;
                Object.keys(data).forEach(function (key) {
                    $scope.envs[jobName][key] = data[key];
                });
            });
        }

        setInterval(getEnvs, 15000);

    });
})
();
