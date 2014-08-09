"use strict";
var express = require('express');
var router = express.Router();
var noble = require('noble');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/api/knowenDevices', function(req, res) {
    var knowenDevices = [
        {    
            UUID: '487f3173d136',
            localName: 'test'
        },{    
            UUID: '1234567890qw',
            localName: 'tes2'
        }
    ];

    res.send(knowenDevices);
});

var blueToothPeripheral = [];
var rssi = 88;
var min = 60;
var max = 100;
var goingUp = true;

router.post('/api/deviceScan', function(req, res) {

/*
    if(goingUp){
        rssi++;
        if(rssi >= max){
            goingUp = false;
        }
    }else{
        rssi--;
        if(rssi <= min){
            goingUp = true;
        }
    }

    var foundDevices = [
        {
            timestamp: Date.now(),
            UUID: '487f3173d136',
            localName: 'test',
            rssi: rssi
        }
    ];
    */
    setTimeout(function(){
        res.send(blueToothPeripheral);
//        res.send(foundDevices);
    }, 500);    
});

module.exports = router;

noble.on('discover', function(peripheral){
//    if(!peripheral) console.log("empty");    

    blueToothPeripheral.push(peripheral);

});

noble.startScanning(); // any service UUID, no duplicates
