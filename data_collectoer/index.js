var noble = require('noble');
var moment = require('moment');

var updateInterval = 200; //ms
var bufferSize = 7;

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

var medianBuffer = [];

function calculateMedian(value){
  if(medianBuffer.length >= bufferSize){
    medianBuffer.shift();
  }

  medianBuffer.push(value);
  var sorted =  medianBuffer.slice().sort();
  if(medianBuffer.length % 2 !== 0){ //uneven
    var i = Math.ceil(medianBuffer.length / 2) -1; //-1 because zero indexed
    return sorted[i];
  }else{ //even
    var i = medianBuffer.length / 2;
    return (sorted[i - 1] + sorted[i]) / 2; //-1 because zero indexed
  }
}
var UUID = process.argv[2] | '5A:B2:84:B8:36:6D';
var lockedUuid = UUID.replace(/:/g, '').toLowerCase();
var count = 0;
console.log('Time,UUID,LocalName,RSSI,MedianRSSI')
noble.addListener('discover', function(peripheral){
  if(!lockedUuid){
    lockedUuid = peripheral.uuid;
    console.log(peripheral.toString());
  }else if(peripheral.uuid !== lockedUuid){
    return;
  }

  var row = [moment().format(),
            peripheral.uuid,
            peripheral.advertisement.localName | 'Unknowen',
            peripheral.rssi,
            calculateMedian(peripheral.rssi)].join(',');

  console.log(row);
  count++;

  if(count >= 60){
    process.exit(0);
  }

});

var scanForDevices = [];
var allowDoublicates = true;
noble.startScanning(scanForDevices, allowDoublicates); // any service UUID, no duplicates

// var timerInst = setTimeout(function(){
//   noble.stopScanning();
//   console.log(count);
//   process.exit(0);
// }, 1000 * 20);

