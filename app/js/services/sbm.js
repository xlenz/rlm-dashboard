'use strict';

console.log('Initializing sbmServices');

angular.module('SbmServices', ['ngResource'])
  .factory('Sbm', ['$resource',
    function ($resource) {
      return $resource('sbm/status', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
