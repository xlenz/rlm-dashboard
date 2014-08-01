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
                .when('/automation', {
                    templateUrl: '../view/automation.html',
                    controller: 'AutomationCtrl'
                })
                .when('/dmcm', {
                    templateUrl: '../view/dmcm.html',
                    controller: 'DmCmCtrl'
                })
                .when('/exceladdin', {
                    templateUrl: '../view/exceladdin.html',
                    controller: 'ExceladdinCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });

        snapRemoteProvider.globalOptions.disable = 'right';
        snapRemoteProvider.globalOptions.touchToDrag = false;
        snapRemoteProvider.globalOptions.maxPosition = 265;
    });

    app.controller('MainCtrl', function ($scope, ActiveTab, ApiClient, Auth) {
        $scope.activeTab = function () {
            return ActiveTab.name();
        };

        $scope.isAuth = function () {
            return Auth.isAuth();
        };

        $scope.getUserDisplayName = function () {
            var user = Auth.getUser();
            console.log( user ? (user.displayName || user.username) : null);
            return user ? (user.displayName || user.username) : null;
        };

        $scope.logout = function () {
            ApiClient.logout().then(
                    function (data) {
                        Auth.setUser(null);
                    }
            );
        };

    });

})();
