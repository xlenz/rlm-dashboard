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

        function getEnvs() {
            ApiClient.environments().then(
                    function (data) {
                        $scope.timestamp = new Date().getTime();
                        console.log(data);

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
