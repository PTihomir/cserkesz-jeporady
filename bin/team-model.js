function TeamModel() {

    this.teams = [];
    this.actionOrder = [];
    this.teamcounter = 1;
}

TeamModel.prototype.addTeam = function () {

    var teamId = this.teamcounter++;

    this.teams.push({
        id: teamId,
        name: 'Team' + teamId,
        point: 0
    });

    return teamId;
};

TeamModel.prototype.removeTeam = function (id) {
    for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id === id) {
            this.teams.splice(i, 1);
            return;
        }
    }
};

TeamModel.prototype.updateTeam = function (id, team) {
    var selectedTeam = null;

    for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id === id) {
            selectedTeam = this.teams[i];
            break;
        }
    }

    if (!selectedTeam) {
        return;
    }

    if (team.name) {
        selectedTeam.name = team.name;
    }

    if (typeof team.point !== 'undefined' && team.point !== null) {
        if (typeof team.point === 'string') {
            selectedTeam.point = parseInt(team.point);
        } else {
            selectedTeam.point = team.point;
        }

    }

};

TeamModel.prototype.getTeam = function (id) {

    for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id === id) {
            return this.teams[i];
        }
    }

    return null;

};

TeamModel.prototype.initTeams = function (n) {
    var teamCount = n || 3;

    for (var i = 0; i < teamCount; i++) {
        this.addTeam();
    }
};

TeamModel.prototype.actionReceived = function (id) {
    for (var i = 0; i < this.actionOrder.length; i++) {
        if (this.actionOrder[i] === id) {
            return;
        }
    }
    this.actionOrder.push(id);
};

TeamModel.prototype.actionReset = function (id) {
    this.actionOrder = [];
};


TeamModel.prototype.getTeams = function () {
    return this.teams;
};

TeamModel.prototype.import = function (teams) {
    this.teams = teams || [];

    for (var i = 0; i < this.teams.length; i++) {
        this.teamcounter = Math.max(this.teamcounter, this.teams[i].id + 1);
    }
};

// TeamModel.prototype.export = function () {

// };

module.exports = function () {
    return new TeamModel();
};
