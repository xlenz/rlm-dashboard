'use strict';

(function () {
    var app = angular.module('rlmDashboard', ['snap', 'ngRoute']);

    app.config(function ($routeProvider, snapRemoteProvider) {
        $routeProvider
                .when('/dashboard', {
                    templateUrl: '../view/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .otherwise({
                    redirectTo: '/dashboard'
                });

        snapRemoteProvider.globalOptions.disable = 'right';
        snapRemoteProvider.globalOptions.touchToDrag = false;
        snapRemoteProvider.globalOptions.maxPosition = 265;
        snapRemoteProvider.globalOptions.tapToClose = true;
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
