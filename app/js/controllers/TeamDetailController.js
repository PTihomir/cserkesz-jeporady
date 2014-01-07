'use strict';

var TeamDetailController = function ($scope, $modalInstance, team) {
    
  $scope.team = team;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

};