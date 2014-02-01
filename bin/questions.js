var fs = require('fs');

var mainfile = '/database/database.json',
    snapshotDir = '/database/snapshots/',
    gameDir = '/database/games/',
    questions,
    snapshots,
    games;

// init questions immediately
refreshQuestions();
refreshSnapshots();
refreshGames();

function refreshQuestions() {
    fs.readFile(mainfile, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        questions = JSON.parse(data);

        console.log(questions.length + ' question loaded.');

    });
}


function refreshSnapshots() {
    fs.readdir(snapshotDir, function (err, files) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        console.log(files.length + ' saved snapshots found.');

        snapshots = files;

    });
}

function refreshGames() {
    fs.readdir(gameDir, function (err, files) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        console.log(files.length + ' prepared games found.');

        games = files;

    });
}


// TODO change to asynchrunous
module.exports.getQuestions = function () {
    return questions;
};

module.exports.getSnapshots = function () {
    return snapshots;
};

module.exports.getGames = function () {
    return games;
};

module.exports.getSnapshot = function (filename, callback) {
    fs.readFile(snapshotDir + filename, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        var snapshot = JSON.parse(data);

        callback(snapshot);

    });
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

module.exports.saveGame = function (filename, data) {

    var stringedData = JSON.stringify(data);

    fs.writeFile(gameDir + filename, stringedData, function (err) {
        if (err) throw err;
        console.log('Game is saved!');
    });
};

module.exports.saveSnapshot = function (filename, data) {

    var stringedData = JSON.stringify(data);

    fs.writeFile(snapshotDir + filename, stringedData, function (err) {
        if (err) throw err;
        console.log('Snapshot is saved!');
    });
};
