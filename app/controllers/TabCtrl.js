'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('TabCtrl', function ($scope, $http, ActiveTab) {
        $scope.tabs = [];

        $http({
            method: 'GET',
            url: '/tabs.json'
        }).success(function (data) {
            $scope.tabs = data;
            ActiveTab.init($scope.tabs);
        }).error(function (error) {
            console.log('failed to load tabs content', error);
        });

        $scope.isCurrent = function (id) {
            return ActiveTab.id() === id;
        };

    });
})();
