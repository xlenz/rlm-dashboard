'use strict';

$(document).click(function (event) {
    var popoverSelector = '.env-plate .info .name span';
    if ($(event.target).is('button') === false) {
        $(popoverSelector).popover('hide').next('.popover').remove();
    } else {
        var buttonParent = $(event.target).parent();
        if (buttonParent.hasClass('custom-popover') === false) {
            return;
        }
        $(popoverSelector).not(buttonParent).popover('hide').next('.popover').remove();
    }

});

(function () {
    var app = angular.module('rlmDashboard');

    app.controller('DashboardCtrl', function ($scope, $http, $q, ApiClient, ActiveTab) {
        ActiveTab.set(0);

        $scope.envs = {};
        $scope.timestamp = new Date().getTime();

        $scope.resolve = function (jobName, id, state) {
            envStateSet(jobName, {
                id: id,
                resolved: state,
                locked: false
            });
        };

        $scope.lock = function (jobName, id) {
            var locked = $scope.envs[jobName].state === 'locked' ? false : true;

            envStateSet(jobName, {
                id: id,
                locked: locked
            });
        };

        getEnvs();

        function getEnvs() {
            ApiClient.environments().then(
                    function (data) {
                        $scope.envs = data;
                        $scope.timestamp = new Date().getTime();
                    }
            );
        }

        function envStateSet(jobName, body) {
            ApiClient.envStateSet(jobName, body).then(function (data) {
                $scope.envs[jobName].state = data.state;
            });
        }

        setInterval(getEnvs, 15000);

    });
})
();
