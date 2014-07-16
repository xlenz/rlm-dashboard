'use strict';

(function () {
    var app = angular.module('rlmDashboard');
    app.directive('tabManager', function () {
        return {
            restrict: 'E',
            templateUrl: '../view/tabManager.html'
        };
    });

    app.directive('customPopover', function () {
        return {
            restrict: 'A',
            template: '<button>{{label}}</button>',
            link: function (scope, el, attrs) {
                scope.label = attrs.popoverLabel;
                $(el).popover({
                    trigger: 'click',
                    html: true,
                    content: function () {
                        return $(this).parent().find('.content').html();
                    },
                    placement: attrs.popoverPlacement
                });
            }
        };
    });

})();
