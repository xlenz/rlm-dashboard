'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('EnvCtrl', function ($scope, ActiveTab) {
        ActiveTab.set(0);
    });
})();
