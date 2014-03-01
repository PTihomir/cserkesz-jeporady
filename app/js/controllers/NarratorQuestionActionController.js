var QuestionActionController = function ($scope, $modalInstance, socketInstance, data) {

  $scope.question = data.question;
  $scope.category = data.category;
  $scope.value = data.value;
  $scope.teams = data.teams;
  console.log($scope.question);

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.cancelAll = function () {
    $scope.hideQuestion();
    $scope.hideAnswer();
    $modalInstance.dismiss('cancel');
  };

  $scope.showQuestion = function () {
    socketInstance.emit('showQuestion', {
      categoryId: $scope.category.id,
      questionId: $scope.question.id
    });
  };

  $scope.hideQuestion = function () {
    socketInstance.emit('hideQuestion');
  };

  $scope.showAnswer = function () {
    socketInstance.emit('showAnswer', {
      categoryId: $scope.category.id,
      questionId: $scope.question.id
    });
  };

  $scope.hideAnswer = function () {
    socketInstance.emit('hideAnswer');
  };

  $scope.startTimer = function () {

  };

  $scope.startTimer = function () {

  };

  $scope.emitQuestionState = function (state) {
    socketInstance.emit('questionUpdated', {
      categoryId: $scope.category.id,
      questionId: $scope.question.id,
      state: state
    });
  };

  $scope.emitTeamPointChange = function (team, positive) {
    team.point = parseInt(team.point) + parseInt($scope.value) * (positive ? 1 : -1);
    socketInstance.emit('teamChanged', {
        id: team.id,
        point: team.point
    });
  };

};
