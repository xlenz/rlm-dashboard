'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('ExceladdinCtrl', function ($scope, ActiveTab) {
        ActiveTab.set(5);
    });
})();
