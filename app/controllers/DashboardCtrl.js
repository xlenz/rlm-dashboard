'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = [];

        ApiClient.environments().then(
                function (data) {
                    $scope.envs = data;
                },
                function (error) {
                    console.error('Failed to get envs', error);
                }
        );

    });
})();
