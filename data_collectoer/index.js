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
    console.log(JSON.stringify(periphreal, null, "   "))

});

noble.startScanning(); // any service UUID, no duplicates






