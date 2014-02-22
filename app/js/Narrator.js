var narratorModule = angular.module('narrator', ['ngRoute', 'ui.bootstrap']);

narratorModule.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/login', {
                templateUrl: 'partials/narratorLoginPartial.html',
                controller: 'LoginController'
            }).
            when('/menu', {
                templateUrl: 'partials/narratorMenuPartial.html',
                controller: 'MenuController'
            }).
            when('/game', {
                templateUrl: 'partials/narratorGamePartial.html',
                controller: 'NarratorController'
            }).
            otherwise({
                redirectTo: 'login'
            });
    }]);
