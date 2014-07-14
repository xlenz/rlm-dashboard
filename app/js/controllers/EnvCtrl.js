'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('EnvCtrl', function ($scope, $http, ApiClient, ActiveTab) {
        ActiveTab.set(1);

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
