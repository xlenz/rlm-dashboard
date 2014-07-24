'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DmCmCtrl', function ($scope, ActiveTab) {
        ActiveTab.set(4);
    });
})();
