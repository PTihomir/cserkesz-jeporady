var socketio = require('socket.io'),
    fs = require('fs'),
    questions = require('./questions.js'),
    gameDir = './database/games/';

function ManagerServer(server) {
    this.server = server;

    this.initSocket();
}

ManagerServer.prototype.initSocket = function() {

    var _this = this;

    var io = this.io = socketio.listen(this.server);

    var manager = this.manager = this.io.of('/manager').on('connection', function (socket) {

        console.log('** Manager connected');

        socket.on('saveGame', function (data, callback) {

            data.game.creationDate = new Date().getTime();

            questions.saveGame(data.filename, data.game, callback);

        });

        socket.on('loadGame', function (data, callback) {

            questions.getGame(data.filename, callback);

        });

    });


};


module.exports = function(server) {
    return new ManagerServer(server);
};


module.exports.getGame = function (filename, callback) {
    fs.readFile(gameDir + filename, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var game = JSON.parse(data);

        callback(game);

    });
};

