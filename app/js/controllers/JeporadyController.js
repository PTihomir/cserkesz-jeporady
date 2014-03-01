'use strict';

jeporadyModule.controller('JeporadyController', function ($scope, $modal, socketInstance) {


    window.scopeData = $scope;

    var modalInstance = null;

    // socket.on('connect')

    socketInstance.on('update', function (data) {

        if (data.teams) {
            $scope.teams = data.teams;
        }

        if (data.game) {
            $scope.categories = data.game;
        }
        $scope.$apply();
    });

    socketInstance.on('showQuestion', function (data) {
        var 
            i = 0,
            j = 0,
            lencat = 0,
            lenque = 0;

        if (modalInstance !== null) {
            modalInstance.dismiss('cancel');
        }

        if (data.categoryId && data.questionId) {
            var cats = $scope.categories;
            for (i = 0, lencat = cats.length; i < lencat; i++) {

                if (cats[i].id == data.categoryId) {
                    for (j = 0, lenque = cats[i].questions.length; j < lenque; j++) {

                        if (cats[i].questions[j].id == data.questionId) {
                            $scope.openQuestionDetail(
                                cats[i].questions[j], 
                                cats[i].displayName, 
                                ((j + 1) * 100)
                            );
                            break;
                        }

                    }
                }

            }
        }
    });

    socketInstance.on('hideQuestion', function () {
        modalInstance.dismiss('cancel');
        modalInstance = null;
    });

    $scope.openQuestionDetail = function (question, category, value) {

        modalInstance = $modal.open({
            templateUrl: 'partials/questionViewPartial.html',
            controller: QuestionViewController,
            resolve: {
                data: function () {
                    return {
                        question: question,
                        category: category,
                        value: value,
                        teams: $scope.teams
                    };
                }
            }
        });

        modalInstance.result.then(function (team) {
            socket.emit('changeTeam', {
                id: team.id,
                name: team.name,
                point: team.point
            });
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    socketInstance.on('showAnswer', function (data) {
        console.log(data);
        var 
            i = 0,
            j = 0,
            lencat = 0,
            lenque = 0;

        if (modalInstance !== null) {
            modalInstance.dismiss('cancel');
        }

        if (data.categoryId && data.questionId) {
            var cats = $scope.categories;
            for (i = 0, lencat = cats.length; i < lencat; i++) {

                if (cats[i].id == data.categoryId) {
                    for (j = 0, lenque = cats[i].questions.length; j < lenque; j++) {

                        if (cats[i].questions[j].id == data.questionId) {
                            $scope.openAnswerDetail(
                                cats[i].questions[j], 
                                cats[i].displayName, 
                                ((j + 1) * 100)
                            );
                            break;
                        }

                    }
                }

            }
        }
    });

    socketInstance.on('hideAnswer', function () {
        modalInstance.dismiss('cancel');
        modalInstance = null;
    });

    $scope.openAnswerDetail = function (answer, category, value) {

        modalInstance = $modal.open({
            templateUrl: 'partials/answerViewPartial.html',
            controller: AnswerViewController,
            resolve: {
                data: function () {
                    return {
                        answer: answer,
                        category: category,
                        value: value,
                    };
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.requestUpdate = function () {
        socketInstance.emit('requestUpdate');
    };

    $scope.requestUpdate();

});
