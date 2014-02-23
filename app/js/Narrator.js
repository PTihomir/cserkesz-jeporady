var narratorModule = angular.module('narrator', ['ngRoute', 'ui.bootstrap']);

narratorModule.value('loginStatus', {
    validLogin: false
});

narratorModule.factory('socketInstance', function () {
    var socket = io.connect('/narrator'),
        handlers = {};

    socket.on('update', function (data) {
        if(handlers.update) {
            handlers.update(data);
        }
    });

    socket.on('invalidGameState', function () {
        if(handlers.invalidGameState) {
            handlers.invalidGameState();
        }

    });

    socket.on('clientAction', function (data) {
        if(handlers.clientAction) {
            handlers.clientAction(data);
        }
    });


    return {
        emit: function () {
            socket.emit.apply(socket, arguments);
        },
        on: function (name, callback) {
            handlers[name] = callback;
        }
    };

});

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
