// teams and points
// questions

// var questions = require('./questions.js'),
//     teams = require('./team-model.js');


// inject questions and teams module
function GameModel(questions, teams) {
    this.snapshotId = false;
    this.categories = [];
    this.teams = teams();
    this.questions = questions;
}

GameModel.prototype.readGame = function (gameId, callback) {

    var $this = this;

    this.questions.getGame(gameId, function (game) {
        var categories = [];

        for (var i = 0; i < game.categories.length; i++) {
            categories.push($this.questions.getCategory(
                game.categories[i].id,
                game.categories[i].questions));
        }

        callback(categories);

    });

};

GameModel.prototype.newGame = function (gameId, snapshotId, teamNumber, callback) {

    console.log('New Game created with gameId "' + gameId + '" and snapshotId "' +snapshotId + '"');

    var _this = this;

    if (this.snapshotId) {
        console.log('Game already initialized, everything resets now');
    }

    this.snapshotId = snapshotId.replace(/ /g,"_");

    this.readGame(gameId, function (categories) {
        _this.categories = categories;

        _this.teams.initTeams(teamNumber);

        _this.saveSnapshot();

        callback();

    });


};

GameModel.prototype.continueSnapshot = function (snapshotId) {

    var _this = this;

    this.snapshotId = snapshotId;

    this.questions.getSnapshot(snapshotId, function (snapshot) {
        _this.restoreGame(snapshot);
    });

};


GameModel.prototype.restoreGame = function (snapshot) {
    // TODO check, if game already initialized, then this should exit

    this.categories = snapshot.categories;
    this.teams.import(snapshot.teams);
};

GameModel.prototype.saveSnapshot = function () {
    this.questions.saveSnapshot(this.snapshotId, {
        categories: this.categories,
        teams: this.teams.getTeams(),
        snapshotId: this.snapshotId
    });
};

module.exports = function (questions, teams) {
    return new GameModel(questions, teams);
};
