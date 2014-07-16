'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = [];

        ApiClient.environments().then(
                function (data) {
                    $scope.envs = data;
                    envStates();
                },
                function (error) {
                    console.error('Failed to get envs', error);
                }
        );

        function envStates() {
            for (var i = 0; i < $scope.envs.length; i++) {
                (
            }
        )
            (i);

        }
    }

    function (idx) {
        ApiClient.envState($scope.envs[i].jobName).then(
                function (data) {
                    $scope.envs[i].state = data;
                });
    }

});
})
();
