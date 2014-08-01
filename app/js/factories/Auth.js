'use strict';

(function () {
   var app = angular.module('rlmDashboard');

   app.factory('Auth', function () {
      var auth = false;
      return {
         isAuth: function () {
            return token;
         },
         setAuth: function (response) {
            auth = response;
         }
      };
   });

})();
