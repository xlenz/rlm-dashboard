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

                this.envState = function (job) {
                    var httpParams = {
                        method: 'GET',
                        url: '/state/' + job
                    };

                    return qHttp(httpParams);
                };

                this.statusImg = function (state) {
                    var httpParams = {
                        method: 'GET',
                        url: '/statusImg/' + state
                    };

                    return qHttp(httpParams);
                };
            }
    );

})();