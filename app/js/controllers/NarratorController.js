'use strict';

narratorModule.controller('NarratorController', function ($scope, $modal, $location, loginStatus, socketInstance) {

    if (!loginStatus.validLogin) {
        $location.path('/login');
        return;
    }

    socketInstance.on('update', function (data) {

        if (data.teams) {
            $scope.teams = data.teams;
        }

        if (data.game) {
            $scope.categories = data.game;
        }
        $scope.$apply();
    });

    socketInstance.on('invalidGameState', function () {

        // Game not initialized, return to "menu"
        $location.path('/menu');
        $scope.$apply();

    });

    socketInstance.on('clientAction', function (data) {
        for (var i = 0; i < data.actions.length; i++) {
            $scope.teams[data.actions[i]].actionOrder = i + 1;
        }
        $scope.$apply();

    });

    $scope.resetTeams = function () {
        socketInstance.emit('resetTeams');
        $.each($scope.teams, function (index, team) {
            team.actionOrder = false;
        });
    };

    $scope.openTeamDetail = function (team) {
        var modalInstance = $modal.open({
                templateUrl: 'partials/teamDetailPartial.html',
                controller: TeamDetailController,
                resolve: {
                    team: function () {
                        return team;
                    }
                }
            });

        modalInstance.result.then(function () {
            socketInstance.emit('changeTeam', {
                id: team.id,
                name: team.name,
                point: team.point
            });
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.openQuestionAction = function (question, category, value) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/questionActionPartial.html',
            controller: QuestionActionController,
            resolve: {
                question: function () {
                    return question;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.openQuestionDetail(question, category, value);
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.openQuestionDetail = function (question, category, value) {

        $scope.resetTeams();

        var modalInstance = $modal.open({
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
            socketInstance.emit('changeTeam', {
                id: team.id,
                name: team.name,
                point: team.point
            });
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.requestUpdate = function () {
        socketInstance.emit('requestUpdate');
    };

    $scope.requestUpdate();

});
