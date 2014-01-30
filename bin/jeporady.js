var socketio = require('socket.io'),
    model = require('./teams.js'),
    questions = require('./questions.js');

function JeporadyServer(server, teamNumber) {
    this.server = server;
    this.initSocket(teamNumber);
}

JeporadyServer.prototype.initSocket = function(teamNumber) {

    var io = this.io = socketio.listen(this.server);

    // init model
    // FIXME add command line parameter for the player number
    model.initTeams(teamNumber);

    // FIXME now its mandatory to connect mobile clients.
    // Fix this so its only an option.
    var mobile = io.of('/mobile').on('connection', function (socket) {

        var id = model.getUniqueId();

        model.teams[id] = {
            id: id,
            name: 'Team ' + (id % 10),
            point: 0
        };

        socket.emit('updateTeam', {team: model.teams[id], force: true});

        display.emit('updateTeams', {teams: model.getTeams()});

        socket.on('pushClick', function (teamid, time) {
            model.actionReceived(id);

            display.emit('clientAction', {
                actions: model.actionOrder
            });

        });

        socket.on('disconnect', function () {
            //socket.broadcast.emit('teamDisconnected', {team: model.teams[id]})
            console.log('>----------> Team disconnected');
            delete model.teams[id];
        });

    });

    var display = io.of('/display').on('connection', function (socket) {

        socket.emit('updateTeams', {teams: model.getTeams()});

        socket.on('changeTeam', function (team) {

            model.teams[team.id] = team;

            socket.emit('updateTeams', {teams: model.teams});

            mobile.emit('updateTeam', {team: team});
        });

        socket.on('resetTeams', function () {
            model.actionReset();
        });



    });

};

module.exports = function(server) {
    return new JeporadyServer(server);
};
