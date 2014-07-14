'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('IntegrationCtrl', function ($scope, ActiveTab) {
        ActiveTab.set(2);
    });
})();
