'use strict';

var QuestionActionController = function ($scope, $modalInstance, question) {
    
  $scope.show = function () {
    $modalInstance.close(question);
  };

  $scope.markAnswered = function () {
    question.answered = true;
    $modalInstance.dismiss();
  };

  $scope.markNotAnswered = function () {
    question.answered = false;
    $modalInstance.dismiss();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

};