var noble = require('noble');

var peripheral = {
  uuid: "<uuid>",
  advertisement: {
    localName: "<name>",
    txPowerLevel: "<int>",
    serviceUuids: ["<service UUID>", "more"],
    manufacturerData: "<Buffer>",
    serviceData: [
        {
            uuid: "<service UUID>",
            data: ["<buffer>"]
        },
        "..."
    ]
  },
  rssi: 0
};

noble.on('discover', function(peripheral){
    if(!peripheral) console.log("empty");
    console.log(peripheral.advertisement.localName + " : " + peripheral.uuid);
    
    setInterval(function(){
        console.log(peripheral.advertisement.localName + " : " + peripheral.rssi);
    }, 200);
});

noble.startScanning(); // any service UUID, no duplicates






