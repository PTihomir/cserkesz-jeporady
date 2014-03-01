var AnswerViewController = function ($scope, $modalInstance, data) {

  $scope.category = data.category;
  $scope.answer = data.answer;
  $scope.value = data.value;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

};
