(function(){
	'use strict';
	
	angular.module('testApp', [])
		.controller('controller', controller);
	
	function controller($scope, $http){
		$scope.model = {
			rssiThresshold: -70,
			maxAge: 30*1000 //30 seconds
		};
		$scope.knowenDevices = [];
		$scope.nearbyDevices = [];
		$scope.validateDevice = validateDevice;
		
		$http.get('/api/knowenDevices').then(function getKnowenDevicesFn(response){
			$scope.knowenDevices = response.data;
			doDeviceScan();
		});

		function validateDevice(device){
			if(!device){
				return false;
			}
			var lastTen = device.rssiHistory.slice(0, 10);
			var avgRssi = lastTen.reduce(function(preVal, curVal){return preVal + curVal;}, 0) / lastTen.length;
			device.avgRssi = avgRssi;
			return device.isKnowen && avgRssi >= $scope.model.rssiThresshold;
		}

		function doDeviceScan(){
			var now = Date.now();
			function forEachNewDevicesCallback(item){
				function idMatch(knowenItem){
					if(item.UUID === knowenItem.UUID){
						if(item.localName){
							knowenItem.localName = item.localName;
						}else if(knowenItem.localName){
							item.localName = knowenItem.localName;
						}
						return true;
					}
					return false;
				}
				for(var i = 0; i < $scope.nearbyDevices.length; i++){
					$scope.nearbyDevices[i].isOld = (now - $scope.nearbyDevices[i].time > $scope.model.maxAge)
					var uuid = $scope.nearbyDevices[i].UUID;
					item.isKnowen = $scope.knowenDevices.some(idMatch);
					if(uuid === item.UUID){
						var rssiHistory = $scope.nearbyDevices[i].rssiHistory || [];
						$scope.nearbyDevices[i] = item;
						rssiHistory.push(item.rssi);
						$scope.nearbyDevices[i].rssiHistory = rssiHistory;
						return;
					}
				}
				item.rssiHistory = [item.rssi];
				$scope.nearbyDevices.unshift(item);
			}
			
			function postDeviceScanFn(response){
				var newDevices = response.data;
				newDevices.forEach(forEachNewDevicesCallback);
//				$scope.nearbyDevices.push(newDevices[0]);
				$scope.nearbyDevices = $scope.nearbyDevices.sort(function(a, b){
					if(b.isKnowen && !a.isKnowen){
						return 1;
					}
					if(!b.isKnowen && a.isKnowen){
						return -1;
					}

					if(now - a.time > $scope.model.maxAge && now - b.time > $scope.model.maxAge){
						return b.time - a.time;
					}
					
					return b.rssi - a.rssi;
				});
				doDeviceScan();
			}
			
			$http.post('/api/deviceScan', {}).then(postDeviceScanFn);
		}
  }
})();
