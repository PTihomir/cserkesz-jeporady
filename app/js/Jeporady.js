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

    socket.on('showAnswer', function (data) {
        if(handlers.showAnswer) {
            handlers.showAnswer(data);
        }
    });

    socket.on('hideAnswer', function () {
        if(handlers.hideAnswer) {
            handlers.hideAnswer();
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
