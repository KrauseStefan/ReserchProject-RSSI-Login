(function(){
	'use strict';
	
	angular.module('testApp', [])
		.controller('controller', controller);
	
	function controller($scope, $http){
		$scope.model = {
			rssiThressholdUpper: -75,
			rssiThressholdLower: -65,
			maxAge: 30*1000, //30 seconds
			filterSize: 5
		};
		
		$scope.knowenDevices = [];
		$scope.nearbyDevices = [];
		$scope.validateDevice = validateDevice;
		
		$http.get('/api/knowenDevices').then(function getKnowenDevicesFn(response){
			$scope.knowenDevices = response.data;
			doDeviceScan();
		});

		function getMedian(list){
			var median = list.length/2
			if(median % 1 === 0){
				var sum = list[Math.ceil(median)] +list[Math.floor(median)];
				return sum / 2;
			}else{
				return list[Math.ceil(median)];
			}
		}

		function validateDevice(device){
			if(!device || device.rssiHistory.length < $scope.model.filterSize){
				return false;
			}
			var latestValues = device.rssiHistory.slice(0, $scope.model.filterSize).sort();
			var avgRssi = latestValues.reduce(function(preVal, curVal){return preVal + curVal;}, 0) / latestValues.length;
			device.avgRssi = avgRssi;
			device.medianRssi = getMedian(latestValues);
			if(device.valid){
				device.valid = device.isKnowen && device.medianRssi >= $scope.model.rssiThressholdUpper;
			}else{
				device.valid = device.isKnowen && device.medianRssi >= $scope.model.rssiThressholdLower;
			}
			return device.valid;
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
						var valid = $scope.nearbyDevices[i].valid;
						$scope.nearbyDevices[i] = item;
						rssiHistory.unshift(item.rssi);
						$scope.nearbyDevices[i].rssiHistory = rssiHistory;
						$scope.nearbyDevices[i].valid = valid;
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
