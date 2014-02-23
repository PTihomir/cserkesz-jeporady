var fs = require('fs');

var mainfile = './database/database.json',
    snapshotDir = './database/snapshots/',
    gameDir = './database/games/',
    categories,
    snapshots,
    games;

// init database immediately
refreshQuestions();
refreshSnapshots();
refreshGames();

function refreshQuestions() {
    fs.readFile(mainfile, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }

        categories = JSON.parse(data);

        console.log(categories.length + ' question loaded.');

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
module.exports.getCategories = function () {
    return categories;
};

module.exports.getSnapshots = function () {
    return snapshots;
};

module.exports.getGames = function () {
    return games;
};

module.exports.getCategory = function (categoryId, selectedQuestions) {

    // iterate and find the category
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === categoryId) {
            var data = {
                id: categories[i].id,
                displayName: categories[i].displayName,
                questions: []
            };

            // find and copy selected questions
            for (var j = 0; j < selectedQuestions.length; j++) {
                for (var z = 0; z < categories[i].questions.length; z++) {
                    if (categories[i].questions[z].id === selectedQuestions[j]) {
                        var question = categories[i].questions[z];
                        data.questions.push({
                            id: question.id,
                            question: question.question,
                            answer: question.answer,
                            comment: question.comment,
                            sound: question.sound,
                            image: question.image
                        });
                    }
                }
            }

            return data;
        }
    }

    console.warn('Warning: Question with id [' + categoryId + '] not found');
    return null;
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
        refreshSnapshots();
    });
};
