'use strict';

(function () {
    var app = angular.module('rlmDashboard', ['snap', 'ngRoute']);

    app.config(function ($routeProvider, snapRemoteProvider) {
        $routeProvider
                .when('/dashboard', {
                    templateUrl: '../view/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .when('/envs', {
                    templateUrl: '../view/envs.html',
                    controller: 'EnvCtrl'
                })
                .when('/integrations', {
                    templateUrl: '../view/integrations.html',
                    controller: 'IntegrationCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });

        snapRemoteProvider.globalOptions.disable = 'right';
        snapRemoteProvider.globalOptions.touchToDrag = false;
        snapRemoteProvider.globalOptions.maxPosition = 265;
    });

    app.controller('MainCtrl', function ($scope, ActiveTab) {
        $scope.activeTab = function () {
            return ActiveTab.name();
        };
    });

})();