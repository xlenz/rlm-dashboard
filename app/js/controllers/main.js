'use strict';

console.log('Initializing MainCtrl');

angular.module('dashboard', ['SbmServices', 'SraServices'])
  .controller('MainCtrl', ['$scope', 'Sbm', 'Sra',
    function ($scope, Sbm, Sra) {
      //$scope.sbm = Sbm.query();
      //console.log($scope.sbm);
    }
  ]);
