'use strict';

(function () {
    var app = angular.module('ciDashboard');

    app.controller('TabCtrl', function ($scope, $http, ActiveTab) {
        $scope.tabs = [];

        $http({
            method: 'GET',
            url: '/tabs'
        }).success(function (data) {
            $scope.tabs = data;
            ActiveTab.init($scope.tabs);
        }).error(function (error) {
            console.log('Failed to get tabs', error);
        });

        $scope.isCurrent = function (id) {
            return ActiveTab.id() === id;
        };

    });
})();
