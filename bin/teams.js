var teams = [];
var actionOrder = [];

function initTeams(n) {
  var teamCount = n || 3

  for (var i = 0; i < teamCount; i++) {

    teams.push({
      id: i,
      name: 'Team ' + i,
      point: 0
    });
  }
}

function actionReceived(id) {
  for (var i = 0; i < actionOrder.length; i++) {
    if (actionOrder[i] === id) {
      return;
    }
  }
  actionOrder.push(id);
}

function actionReset(id) {
  actionOrder = [];
}


exports.getTeams = function () {
  return teams;
}

exports.initTeams = initTeams;

exports.updateTeam = function (id, team) {
  var selectedTeam = teams[id];

  if (!selectedTeam) {
    return;
  }

  if (team.name) {
    selectedTeam.name = team.name;
  }

  if (typeof team.point !== 'undefined' && team.point !== null) {
    selectedTeam.point = team.point;
  }

}