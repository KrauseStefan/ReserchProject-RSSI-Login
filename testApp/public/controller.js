(function(){
	'use strict';
	
	angular.module('testApp', [])
		.controller('controller', controller);
	
	function controller($scope, $http){
		$scope.knowenDevices = [];
		$scope.nearbyDevices = [];
		
		$http.get('/api/knowenDevices').then(function getKnowenDevicesFn(response){			
			$scope.knowenDevices = response.data;
			doDeviceScan();
		});

		function doDeviceScan(){
			function forEachCallback(item){
				for(var i = 0; i < $scope.nearbyDevices.length; i++){
					var uuid = $scope.nearbyDevices[i].UUID;
					if(uuid === item.UUID){
						$scope.nearbyDevices[i] = item;
						return;
					}
				}
				$scope.nearbyDevices.unshift(item);
			}
			
			function postDeviceScanFn(response){
				var newDevices = response.data;
				newDevices.forEach(forEachCallback);
				doDeviceScan();
			}
			
			$http.post('/api/deviceScan', {}).then(postDeviceScanFn);
		}
  }
})();
