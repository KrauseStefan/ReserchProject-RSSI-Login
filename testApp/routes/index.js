"use strict";
var express = require('express');
var router = express.Router();

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

var rssi = 88;
var min = 60;
var max = 100;
var goingUp = true;
router.post('/api/deviceScan', function(req, res) {

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
    setTimeout(function(){
        res.send(foundDevices);
    }, 500);    
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

module.exports = router;