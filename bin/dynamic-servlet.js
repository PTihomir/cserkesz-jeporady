var util = require('util'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    events = require('events'),
    questions = require('./questions.js');

/**
 * Handles static content.
 */
function DynamicServlet() {

    this.routing = {
        'categories': this.fetchQuestions,
        'games': this.fetchGames,
        'snapshots': this.fetchSnapshots
    };


}

DynamicServlet.prototype.handleRequest = function(req, res) {
    var self = this;
    var path = ('./' + req.url.pathname).replace('//','/').replace(/%(..)/g, function(match, hex){
       return String.fromCharCode(parseInt(hex, 16));
    });

    var parts = path.split('/');

    if(this.routing[parts[parts.length-1]]) {
        var data = this.routing[parts[parts.length-1]]();
        this.sendJSON(req, res, data);
    } else {
        this.sendMissing_(req, res, path);
    }

};

DynamicServlet.prototype.sendError_ = function(req, res, error) {
    res.writeHead(500, {
        'Content-Type': 'application/json'
    });
    res.write('{"error": true}');
    util.puts('500 Internal Server Error');
    util.puts(util.inspect(error));
};

DynamicServlet.prototype.sendMissing_ = function(req, res, path) {
    path = path.substring(1);
    res.writeHead(404, {
        'Content-Type': 'application/json'
    });
    res.write('{"error": true, "message": "Path not found"}');
    res.end();
    util.puts('404 Not Found: ' + path);
};

DynamicServlet.prototype.sendJSON = function(req, res, jsonData) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(jsonData));

    res.end();
};

DynamicServlet.prototype.fetchQuestions = function() {
    questions.getCategories();
    return questions.getCategories();
};

DynamicServlet.prototype.fetchGames = function() {
    questions.getGames();
    return questions.getGames();
};

DynamicServlet.prototype.fetchSnapshots = function() {
    questions.getSnapshots();
    return questions.getSnapshots();
};

module.exports.servlet = DynamicServlet;
