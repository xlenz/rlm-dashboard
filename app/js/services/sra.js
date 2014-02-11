'use strict';

console.log('Initializing sraServices');

angular.module('SraServices', ['ngResource'])
  .factory('Sra', ['$resource',
    function ($resource) {
      return $resource('sra/status', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);
