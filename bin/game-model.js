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

GameModel.prototype.continueSnapshot = function (snapshotId, callback) {

    var _this = this;

    this.snapshotId = snapshotId;

    this.questions.getSnapshot(snapshotId, function (snapshot) {
        _this.restoreGame(snapshot);

        callback();
    });

};

GameModel.prototype.questionUpdated = function (categoryId, questionId, state) {

    var question = this.getQuestion(categoryId, questionId);

    if (question && question.answered !== state) {
        question.answered = state;

        return true;
    }

    return false;

};

GameModel.prototype.getCategory = function (categoryId) {

    for (var i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id === categoryId) {
            return this.categories[i];
        }
    }

    return null;
};

GameModel.prototype.getQuestion = function (categoryId, questionId) {
    var category = this.getCategory(categoryId);

    if (category) {
        for (var i = 0; i < category.questions.length; i++) {
            if (category.questions[i].id === questionId) {
                return category.questions[i];
            }
        }
    } else {
        console.error('getQuestion: Category Id invalid');
    }

    return null;
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
