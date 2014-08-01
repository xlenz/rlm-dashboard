'use strict';

(function () {
    var app = angular.module('rlmDashboard');

    app.service('ApiClient', function ($http, $q) {

                var qHttp = function (httpParams) {
                    var deferred = $q.defer();

                    $http(httpParams).success(function (data) {
                        deferred.resolve(data);
                    }).error(function (data) {
                        console.error(data);
                        deferred.reject(data);
                    });

                    return deferred.promise;
                };

                this.environments = function () {
                    var httpParams = {
                        method: 'GET',
                        url: '/environments'
                    };

                    return qHttp(httpParams);
                };

                this.envStateSet = function (id, data) {
                    var httpParams = {
                        method: 'POST',
                        data: data,
                        url: '/state/' + id
                    };

                    return qHttp(httpParams);
                };

                this.login = function (data) {
                    var httpParams = {
                        method: 'POST',
                        data: data,
                        url: '/login'
                    };

                    return qHttp(httpParams);
                };

                this.signup = function (data) {
                    var httpParams = {
                        method: 'POST',
                        data: data,
                        url: '/signup'
                    };

                    return qHttp(httpParams);
                };

                this.logout = function (data) {
                    var httpParams = {
                        method: 'POST',
                        url: '/logout'
                    };

                    return qHttp(httpParams);
                };

            }
    );

})();