var jeporadyModule = angular.module('jeporady', ['ui.bootstrap']);


jeporadyModule.factory('socketInstance', function () {
    var socket = io.connect('/display'),
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

    socket.on('showQuestion', function (data) {
        if(handlers.showQuestion) {
            handlers.showQuestion(data);
        }
    });

    socket.on('hideQuestion', function () {
        if(handlers.hideQuestion) {
            handlers.hideQuestion();
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
