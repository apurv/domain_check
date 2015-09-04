var Home = angular.module('home', []);

Home.controller('HomeCtrl', function($scope, $http) {
	$scope.domains = [];
	$scope.newDomain = {
		addr: ''
	};
	
	$scope.getDomains = function(){
		socket.get('/domain', {}, function(response){
			$scope.domains = response;
			$scope.$apply();
		});
	};
	
	$scope.addDomain = function(form){
		socket.post('/domain', $scope.newDomain, function(response){
			if(response.status === 500){
				alert('error occured');
			}else{
				$('#newDomainModal').modal('hide');
				$scope.newDomain.addr = '';
				$scope.getDomains();
			}
		});
	};
	
	$scope.removeDomain = function(domain){
		socket.delete('/domain/' + domain.id, function(response){
			$scope.getDomains();
		});
	};
	
	setTimeout($scope.getDomains, 100);
});
