"use strict";
var express = require('express');
var router = express.Router();
var noble = require('noble');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/template/:template', function(req, res) {
  res.render('template/' + req.params.template);
});

router.get('/api/knowenDevices', function(req, res) {
  var knowenDevices = [
    {    
      UUID: 'c485082235d4',
      localName: 'PC'
    },{    
      UUID: '001a7dda7108',
      localName: 'pi krause'
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
    var data = [];	
    for(var i = 0; i < blueToothPeripheral.length; i++){
      data.push({
        time : Date.now(),
        UUID : blueToothPeripheral[i].uuid,
        localName : blueToothPeripheral[i].advertisement.localName,
        rssi : blueToothPeripheral[i].rssi
      });
    }

    res.send(data);
//  res.send(foundDevices);
  }, 500);
});

module.exports = router;

noble.on('discover', function(peripheral){
  blueToothPeripheral.push(peripheral);
});

noble.startScanning(); // any service UUID, no duplicates
