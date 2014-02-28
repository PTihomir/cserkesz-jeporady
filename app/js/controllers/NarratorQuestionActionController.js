var QuestionActionController = function ($scope, $modalInstance, socketInstance, data) {

  $scope.question = data.question;
  $scope.category = data.category;
  $scope.value = data.value;
  $scope.teams = data.teams;

  $scope.correctAnswer = function (team) {
    team.point = parseInt(team.point) + parseInt($scope.value);
    $scope.question.answered = true;
  };

  $scope.incorrectAnswer = function (team) {
    // $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.showQuestion = function () {
    socketInstance.emit('showQuestion', {

    });
  };

  $scope.hideQuestion = function () {

  };

  $scope.showAnswer = function () {

  };

  $scope.hideAnswer = function () {

  };

  $scope.startTimer = function () {

  };

};
