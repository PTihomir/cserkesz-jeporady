var managerModule = angular.module('manager', ['ui.bootstrap']);

managerModule.factory('socketInstance', function () {
    var socket = io.connect('/manager'),
        handlers = {};

    return {
        emit: function () {
            socket.emit.apply(socket, arguments);
        },
        on: function (name, callback) {
            handlers[name] = callback;
        }
    };

});

