'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('AutomationCtrl', function ($scope, ActiveTab) {
        ActiveTab.set(3);
    });
})();
