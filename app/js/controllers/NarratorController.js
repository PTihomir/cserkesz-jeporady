'use strict';

narratorModule.controller('NarratorController', function ($scope, $modal) {

    var socket = io.connect('/narrator');

    // socket.on('connect')

    socket.on('update', function (data) {
        console.log(data);
        if (data.teams) {
            $scope.teams = data.teams;
        }

        if (data.game) {
            $scope.categories = data.game;
        }
        $scope.$apply();
    });

    socket.on('clientAction', function (data) {
        for (var i = 0; i < data.actions.length; i++) {
            $scope.teams[data.actions[i]].actionOrder = i + 1;
        }
        $scope.$apply();

    });

    $scope.resetTeams = function () {
        socket.emit('resetTeams');
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
            socket.emit('changeTeam', {
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
            socket.emit('changeTeam', {
                id: team.id,
                name: team.name,
                point: team.point
            });
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.gameSelected = function () {

    }

    function getGames() {
        $.ajax({
            url: 'games',
            type: 'POST'
        }).done(function(data) {
            console.log(data);
        });


    }


});
