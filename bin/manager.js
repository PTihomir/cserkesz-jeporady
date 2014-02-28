var socketio = require('socket.io'),
    questions = require('./questions.js');

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

    });


};



module.exports = function(server) {
    return new ManagerServer(server);
};
