'use strict';

mobileClient.controller('MobileClientController', function ($scope) {

	var socket = io.connect('/mobile');
  	
	// socket.on('connect')

  	socket.on('updateTeam', function (data) {
    	console.log(data);
      if (!$scope.teamId || data.force) {
        $scope.teamId = data.team.id;
      }


      if ($scope.teamId === data.team.id) {
      	
      	$scope.teamname = data.team.name;
    		$scope.point = data.team.point;

      }
      $scope.$apply();
  	});

	$scope.pushClick = function pushClick() {
		$scope.actionTime = new Date().getTime();
		socket.emit('pushClick', $scope.teamname, {time: $scope.actionTime});
	};
});