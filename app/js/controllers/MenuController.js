'use strict';

narratorModule.controller('MenuController', function ($scope, $location) {

    $scope.games     = [];
    $scope.snapshots = [];
    $scope.result = {
        game: 0,
        gamename: '',
        teamnumber: 3,
        snapshot: 0,
    };

    var socket = io.connect('/narrator');


    $scope.loadData = function () {

        $.ajax('/games', {
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $scope.games = data;
                $scope.$apply();
            }
        });

        $.ajax('/snapshots', {
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                $scope.snapshots = data;
                $scope.$apply();
            }
        });

    };


    $scope.startGame = function () {
        var result = $scope.result;

        if (result.game !== 0) {
            if (result.gamename === '') {
                alert("Hiba! Adj meg jaték nevet (nem egyezhet létező pillanatkép névvel)!");
                return;
            }


            var name = result.gamename + '.json';
            for (var i = $scope.snapshots.length; i >= 0; i--) {
                if (name == $scope.snapshots[i]) {
                    if (confirm('Figyelem! Felül szeretné írni létező pillanatképet?') === 1) {
                        continue;
                    } else {
                        return;
                    }
                }
            }


            result.teamnumber = ~~parseInt(result.teamnumber);
            if (result.teamnumber <= 0) {
                alert("Hiba! Kötelező a csapatok számát megadni!");
                return;
            }

            socket.emit('gameSelected', {
                gameId: result.game,
                snapshotName: result.gamename + '.json',
                teamNumber: result.teamnumber
            }, function() {
                $location.path('/game').replace();
            });
        }
        else if (result.snapshot !== 0) {
            socket.emit('snapshotSelected', { snapshotId: result.snapshot }, function() {
                $location.path('/game').replace();
            });
        }
        else {
            alert("Hiba! Válassz ki valamit! ");
            return;
        }
    }

});
