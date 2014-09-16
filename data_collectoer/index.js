var noble = require('noble');
var moment = require('moment');

// var noble = {
//   on: function(){},
//   startScanning: function(){}
// }

var updateInterval = 200; //ms

// var peripheral = {
//   uuid: "<uuid>",
//   advertisement: {
//     localName: "<name>",
//     txPowerLevel: "<int>",
//     serviceUuids: ["<service UUID>", "more"],
//     manufacturerData: "<Buffer>",
//     serviceData: [
//         {
//             uuid: "<service UUID>",
//             data: ["<buffer>"]
//         },
//         "..."
//     ]
//   },
//   rssi: 0
// };

var medianBuffer = [1000, 1000, 1000, 1000, -10000, -10000, -10000];

function calculateMedian(value){
  medianBuffer.shift();

  medianBuffer.push(value);
//  console.log(JSON.stringify(medianBuffer));
//  console.log(JSON.stringify(medianBuffer.slice().sort()));

  return medianBuffer.slice().sort()[3];
}

console.log("Time,UUID,LocalName,RSSI,MedianRSSI")

var lockedUuid;

noble.on('discover', function(peripheral){
//    if(!peripheral) console.log("empty");

  if(!lockedUuid){
    lockedUuid = peripheral.uuid;
  }else if(peripheral.uuid !== lockedUuid){
    return;
  }


  for(var i in peripheral){
    console.log(i + ': ' + peripheral[i]);    
  }
  console.log(peripheral.toString());    

  peripheral.on('rssiUpdate', function(error, rssi){
    console.log('I was here')
    // setInterval(function(){

    var row = moment().format() + "," +
              peripheral.uuid + "," +
              peripheral.advertisement.localName + "," +
              rssi + "," +
              calculateMedian(peripheral.rssi);

    console.log(row);
  });//, updateInterval);
});

var scanForDevices = [];
var allowDoublicates = false;
noble.startScanning(scanForDevices, allowDoublicates); // any service UUID, no duplicates

var timerInst = setTimeout(function(){
  console.log("times up!");
  noble.stopScanning();

}, updateInterval * 60);

// clearInterval(timerInst);


  


