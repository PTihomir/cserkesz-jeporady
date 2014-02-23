var socketio = require('socket.io'),
    teammodel = require('./team-model.js'),
    gamemodel = require('./game-model.js'),
    questions = require('./questions.js');

function JeporadyServer(server, teamNumber) {
    this.server = server;

    this.game = gamemodel(questions, teammodel);

    this.teams = null;

    this.initSocket();
}

JeporadyServer.prototype.initSocket = function() {

    var io = this.io = socketio.listen(this.server);

    this.initNarratorSocket();
    this.initDisplaySocket();

    // init model
    // FIXME add command line parameter for the player number

    // FIXME now its mandatory to connect mobile clients.
    // Fix this so its only an option.
/*    var mobile = io.of('/mobile').on('connection', function (socket) {

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
*/
/*    var display = io.of('/display').on('connection', function (socket) {

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
*/

};


JeporadyServer.prototype.initNarratorSocket = function() {

    var _this = this;

    var narrator = this.narrator = this.io.of('/narrator').on('connection', function (socket) {

        console.log('** Narrator connected');

        socket.on('requestUpdate', function (data, callback) {
            if (_this.teams) {
                console.log('** GAME OK');
                socket.emit('update', {
                    teams: _this.teams.getTeams(),
                    game: _this.game.categories
                });
            } else {
                console.log('** GAME NOT INITIALIZED');
                socket.emit('invalidGameState', {});
            }
        });

        socket.on('gameSelected', function (data, callback) {

            _this.game.newGame(data.gameId, data.snapshotName, data.teamNumber, function () {

                _this.teams = _this.game.teams;

                _this.emitGameUpdated();

                _this.emitTeamsUpdated();

                if (callback) {
                    callback(true);
                }

            });

        });

        socket.on('snapshotSelected', function (data, callback) {
            _this.game.continueSnapshot(data.snapshotId, function () {

                _this.teams = _this.game.teams;

                _this.emitGameUpdated();

                _this.emitTeamsUpdated();

                if (callback) {
                    callback(true);
                }

            });

        });

        socket.on('teamChanged', function (data) {
            _this.teams.updateTeam(data.id, data);

        });

        socket.on('questionUpdated', function (data) {

        });



    });

};

JeporadyServer.prototype.initDisplaySocket = function() {

    var _this = this;

    var display = this.display = this.io.of('/display').on('connection', function (socket) {

        console.log('**************** Display connected');

        if (_this.teams) {
            socket.emit('updateTeams', {teams: _this.teams.getTeams()});
        } else {
            console.log('**************** GAME NOT INITIALIZED');
        }

    });

};


JeporadyServer.prototype.emitGameUpdated = function() {

    var data = {
        game: this.game.categories
    };

    this.narrator.emit('update', data);

    this.display.emit('update', data);

};

JeporadyServer.prototype.emitTeamsUpdated = function() {

    var data = {
        teams: this.game.teams
    };

    this.narrator.emit('update', data);

    this.display.emit('update', data);

};

JeporadyServer.prototype.emitTeamUpdated = function(id) {

    var data = {
        team: this.game.teams
    };

    this.narrator.emit('update', data);

    this.display.emit('update', data);

};


module.exports = function(server) {
    return new JeporadyServer(server);
};
