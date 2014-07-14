'use strict';

(function () {
    var app = angular.module('boilerplate', ['snap']);

    app.controller('MainCtrl', function ($scope, SNAP_VERSION) {
        $scope.snapOpts = {
            disable: 'right'
        };
    });
})();
