'use strict';

jeporadyModule.controller('JeporadyController', function ($scope, $modal, socketInstance) {


    window.scopeData = $scope;

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

    $scope.requestUpdate = function () {
        socketInstance.emit('requestUpdate');
    };

    $scope.requestUpdate();

});
