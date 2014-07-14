'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.factory('ActiveTab', function () {
        var tabs = [];
        var activeTab = 0;
        return {
            init: function (_tabs) {
                tabs = _tabs;
            },
            id: function () {
                return activeTab;
            },
            name: function () {
                if (tabs.length > 0) {
                    return tabs[activeTab].name;
                }
                else {
                    return 'RLM Dashboard';
                }
            },
            set: function (id) {
                activeTab = id;
            }
        };
    });

})();
