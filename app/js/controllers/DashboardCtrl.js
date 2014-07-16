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

        ApiClient.environments().then(
                function (data) {
                    $scope.envs = data;
                    var arr = [];

                    Object.keys($scope.envs).forEach(function (key) {
                        arr.push(ApiClient.envStateGet(key));
                    });

                    envStates(arr);
                }
        );

        function envStates(arr) {
            $q.all(arr).then(
                    function (data) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.envs[data[i].job].state = data[i].state;
                            $scope.envs[data[i].job].id = data[i].id;
                        }
                    });
        }

        $scope.resolve = function (jobName, id, state) {
            envStateSet(jobName, {
                id: id,
                resolved: state
            });
        };

        $scope.lock = function (jobName, id) {
            var locked = $scope.envs[jobName].state === 'locked' ? false : true;

            envStateSet(jobName, {
                id: id,
                locked: locked
            });
        };

        function envStateSet(jobName, body) {
            ApiClient.envStateSet(jobName, body).then(function (data) {
                $scope.envs[jobName].state = data.state;
            });
        }

    });
})
();
