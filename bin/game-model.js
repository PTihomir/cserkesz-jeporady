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

GameModel.prototype.newGame = function (gameId, snapshotId) {
    // TODO check, if game already initialized, then this should exit
    this.snapshotId = snapshotId.replace(/ /g,"_");

    this.readGame(gameId, function (categories) {
        this.categories = categories;
    });

    this.teams.initTeams();

    this.saveSnapshot();

};


GameModel.prototype.restoreGame = function (snapshot) {
    // TODO check, if game already initialized, then this should exit

    this.categories = snapshot.categories;
    this.teams.setTeams(snapshot.teams);
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
