'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.factory('Auth', function (ApiClient) {
        var user = null;
        ApiClient.me().then(function (data) {
            console.log(data);
            if (data.success === true) {
                user = data.user;
            }
        });
        return {
            isAuth: function () {
                return user === null ? false : true;
            },
            setUser: function (response) {
                user = response;
            },
            getUser: function () {
                return user;
            }
        };
    });

})();
