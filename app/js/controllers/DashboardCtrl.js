'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, $q, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = {};
        $scope.timestamp = new Date().getTime();

        $scope.resolve = function (jobName, id, state) {
            envStateSet(jobName, {
                id: id,
                resolved: state,
                locked: false
            });
        };

        $scope.lock = function (jobName, id) {
            var locked = $scope.envs[jobName].state === 'locked' ? false : true;

            envStateSet(jobName, {
                id: id,
                locked: locked
            });
        };

        getEnvs();

        function getEnvs() {
            ApiClient.environments().then(
                    function (data) {
                        $scope.timestamp = new Date().getTime();

                        Object.keys($scope.envs).forEach(function (key) {
                            var result = data[key].result ? data[key].result : 'Building';
                            if ($scope.envs[key].id !== data[key].id || $scope.envs[key].result !== data[key].result) {
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

        function envStateSet(jobName, body) {
            ApiClient.envStateSet(jobName, body).then(function (data) {
                $scope.envs[jobName].state = data.state;
            });
        }

        setInterval(getEnvs, 15000);

    });
})
();
