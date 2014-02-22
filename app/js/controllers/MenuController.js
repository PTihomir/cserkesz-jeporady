'use strict';

narratorModule.controller('MenuController', function ($scope, $location) {

    $scope.enteredPassword = '';
    $scope.passwordInvalidMessage = false;

    $scope.login = function login () {
        if ($scope.enteredPassword === '') {
            $scope.passwordInvalidMessage = 'Enter password!';
        } else if ($scope.enteredPassword === '2382') {
            $location.path('game').replace();
        } else {
            $scope.passwordInvalidMessage = 'Wrong password!';
        }

    };


});
