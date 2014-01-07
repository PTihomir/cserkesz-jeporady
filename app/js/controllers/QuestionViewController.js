'use strict';

var QuestionViewController = function ($scope, $modalInstance, data) {
    
  $scope.question = data.question;
  $scope.category = data.category;
  $scope.value = data.value;
  $scope.teams = data.teams;

  $scope.correctAnswer = function (team) {
    team.point = parseInt(team.point) + parseInt($scope.value);
    $scope.question.answered = true;
    $modalInstance.close(team);
  };
  $scope.incorrectAnswer = function (team) {
    // $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

};