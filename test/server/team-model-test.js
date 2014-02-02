var assert = require('assert'),
    should = require('should'),
    createTeamModel = require('../../bin/team-model.js');

describe('Team model', function(){

    var team = null;

    // before(function () {
    //     console.log('**** before');
    // });

    beforeEach(function () {
        team = createTeamModel();
    });

    describe('Add, remove, update team', function(){

        it('add team should increase the team number', function(){

            team.getTeams().should.have.a.lengthOf(0);
            var teamId = team.addTeam();
            team.getTeams().should.have.a.lengthOf(1);

            var insertedTeam = team.getTeam(teamId);

            insertedTeam.should.have.property('id', 1);
            insertedTeam.should.have.property('point', 0);
            insertedTeam.should.have.property('name', 'Team1');
        });

        it('return correct team', function(){

            team.getTeams().should.have.a.lengthOf(0);
            var teamId1 = team.addTeam();
            var teamId2 = team.addTeam();
            var teamId3 = team.addTeam();
            team.getTeams().should.have.a.lengthOf(3);

            team.getTeam(teamId1).should.be.ok.and.have.property('id', teamId1);
            team.getTeam(teamId2).should.be.ok.and.have.property('id', teamId2);
            team.getTeam(teamId3).should.be.ok.and.have.property('id', teamId3);

        });

        it('remove team should delete team', function(){

            var teamId1 = team.addTeam();
            var teamId2 = team.addTeam();
            var teamId3 = team.addTeam();

            // remove middle element
            team.removeTeam(teamId2);

            team.getTeams().should.have.a.lengthOf(2);

            team.getTeam(teamId1).should.be.ok.and.have.property('id', teamId1);
            assert.ok(!team.getTeam(teamId2));
            team.getTeam(teamId3).should.be.ok.and.have.property('id', teamId3);

            // remove first element
            team.removeTeam(teamId1);
            team.getTeams().should.have.a.lengthOf(1);
            assert.ok(!team.getTeam(teamId1));
            team.getTeam(teamId3).should.be.ok.and.have.property('id', teamId3);

            // remove last element
            team.removeTeam(teamId3);
            team.getTeams().should.have.a.lengthOf(0);
            assert.ok(!team.getTeam(teamId3));
        });

        it('update team', function(){

            var teamId1 = team.addTeam();

            team.getTeam(teamId1).should.eql({
                id: teamId1,
                name: 'Team1',
                point: 0
            });

            team.updateTeam(teamId1, {
                name: 'Team A',
                point: 999
            });

            team.getTeam(teamId1).should.eql({
                id: teamId1,
                name: 'Team A',
                point: 999
            });

            team.updateTeam(teamId1, {
                name: 'Super Team'
            });

            team.getTeam(teamId1).should.eql({
                id: teamId1,
                name: 'Super Team',
                point: 999
            });

            team.updateTeam(teamId1, {
                point: '123'
            });

            team.getTeam(teamId1).point.should.equal(123);
        });

        it('import teams', function(){

            var teamId1 = team.addTeam();
            var teamId2 = team.addTeam();
            var teamId3 = team.addTeam();

            team.getTeams().should.have.a.lengthOf(3);

            var savedTeams = team.getTeams();

            team.import([]);

            team.getTeams().should.have.a.lengthOf(0);

            team.import(savedTeams);

            team.getTeam(teamId1).should.be.ok
                .and.have.property('id', teamId1);

            team.getTeam(teamId2).should.be.ok
                .and.have.property('id', teamId2);

            team.getTeam(teamId3).should.be.ok
                .and.have.property('id', teamId3);

        });

    });

    describe('Action related tests', function(){
        it('Add action id', function(){

            team.actionReceived('id1');

            team.actionOrder.should.have.a.lengthOf(1);
            team.actionOrder.should.containEql('id1');

            team.actionReceived('id2');
            team.actionOrder.should.have.a.lengthOf(2);
            team.actionOrder.should.containEql('id1');
            team.actionOrder.should.containEql('id2');

        });

        it('Add the same action id', function(){

            team.actionReceived('id1');
            team.actionReceived('id2');
            team.actionOrder.should.have.a.lengthOf(2);

            team.actionReceived('id1');

            team.actionOrder.should.have.a.lengthOf(2);

        });

    });
});
