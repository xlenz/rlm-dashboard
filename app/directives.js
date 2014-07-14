'use strict';

(function () {
    var app = angular.module('rlmDashboard');
    app.directive('tabManager', function () {
        return {
            restrict: 'E',
            templateUrl: 'view/tabManager.html'
        };
    });
})();
