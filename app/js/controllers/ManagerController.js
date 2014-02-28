'use strict';

managerModule.controller('ManagerController', function ($scope, $modal, socketInstance) {


    window.scopeData = $scope;

    $scope.questions = null;

    $scope.fileName = '';

    $scope.game = {
        categories: [],
        createdBy: 'application',
        displayName: ''
    };

    $scope.selectedCategories = [0, 1, 2, 3, 4, 5];
    $scope.detailedCategories = [];

    $scope.loadData = function () {

        $.ajax('/games', {
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $scope.games = data;
                $scope.$apply();

                ohSnap('Games loaded', 'blue');
            }
        });

        $.ajax('/categories', {
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $scope.questions = data;
                $scope.$apply();

                ohSnap('Questions loaded', 'blue');
            }
        });
    };

    $scope.onChange = function (orderNumber) {

        var id = $scope.selectedCategories[orderNumber],
            n = $scope.questions.length;

        for (var i = 0; i < n; i++) {
            if ($scope.questions[i].id === $scope.selectedCategories[orderNumber]) {
                var category = $scope.detailedCategories[orderNumber] = $scope.questions[i];

                $scope.game.categories[orderNumber] = {
                    id: category.id,
                    questions: []
                };

                for (var j = 0; j < category.questions.length; j++) {
                    $scope.game.categories[orderNumber].questions.push(category.questions[j].id);
                }

            }
        }

    };

    $scope.onSaveGame = function () {

        if ($scope.fileName === '') {
            ohSnap('Define filename.', 'red');
        }

        socketInstance.emit('saveGame', {
            filename: $scope.fileName + '.json',
            game: $scope.game
        }, function () {
            ohSnap('Game saved!', 'green');
        });

    };

});
