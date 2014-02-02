var assert = require('assert'),
    should = require('should'),
    createGameModel = require('../../bin/game-model.js'),
    teams = require('../../bin/team-model.js'),
    fs = require('fs');

var mockQuestions = {
    filename: null,
    data: null,
    gameId: null,
    categoryId: null,
    questions: null,

    saveSnapshot: function (filename, data) {
        this.filename = filename;
        this.data = data;
    },

    getGame: function (gameId, callback) {
        this.gameId = gameId;

        callback({
            categories: [{
                id: "category_id",
                questions: [1, 2, 3]
            },{
                id: "category_id",
                questions: [1, 2, 3]
            }]
        });
    },

    getCategory: function (categoryId, questions) {
        this.categoryId = categoryId;
        this.questions = questions;

        return {
            displayName: 'Some',
            questions: ['dummyQuestions']
        };
    }
};

describe('Game model', function(){

    var game = null;

    beforeEach(function () {
        game = createGameModel(mockQuestions, teams);
    });

    describe('New Game', function(){
        it('new game should initialize everything', function (done) {

            game.newGame('dummyGameId', 'Some Game');

            game.snapshotId.should.equal('Some_Game');

            game.teams.getTeams().should.have.a.lengthOf(3);

            mockQuestions.filename.should.equal('Some_Game');
            mockQuestions.data.should.have.property('categories');
            mockQuestions.data.should.have.property('teams');
            mockQuestions.data.should.have.property('snapshotId', 'Some_Game');

            done();
        });

    });

    describe('Restore Game', function () {
        it('resotre game should initialize everything', function (done) {
            done();
        });
    });

    describe('Read Game', function () {
        it('read game with questions', function (done) {

            var gameId = 'dummy-game-id';

            game.readGame(gameId, function (categories) {
                categories.should.have.a.lengthOf(2);

                categories[0].should.have.property('displayName', 'Some');
                categories[0].should.have.property('questions', ['dummyQuestions']);

                mockQuestions.gameId.should.equal(gameId);
                mockQuestions.categoryId.should.equal('category_id');
                mockQuestions.questions.should.eql([1, 2, 3]);

                done();
            });
        });
    });


});
