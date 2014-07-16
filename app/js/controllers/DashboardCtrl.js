'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, $q, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = [];

        ApiClient.environments().then(
                function (data) {
                    $scope.envs = data;
                    var arr = [];
                    for (var i = 0; i < $scope.envs.length; i++) {
                        arr.push(ApiClient.envState($scope.envs[i].jobName));
                    }
                    envStates(arr);
                }
        );

        function envStates(arr) {
            $q.all(arr).then(
                    function (data) {
                        for (var i = 0; i < $scope.envs.length; i++) {
                            $scope.envs[i].state = data[i];
                        }
                        angular.forEach(data, function(item) {
                            console.log(item.data);
                        });
                    });
        }

    });
})
();
