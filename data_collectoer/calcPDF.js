// node samples/sample.js

var parse = require('csv').parse;
var fs = require('fs');


function parseData(name, err, data){
    if(err){
        console.log(name, err);
        return err;
    }
    data = data.map(function(elm){
        return elm.RSSI;
    });

    var dataMap = {};
    data = data.sort();

    while(data.length > 0){
    	var value = data.pop();
    	if(dataMap[value]){
    		dataMap[value]++;
    	}else{
    		dataMap[value] = 1;
    	}
    }

    var totalSum = 0;
    for(var i in dataMap){
        totalSum += dataMap[i];
    }

    for(var i = 0 in dataMap){
	    console.log(i + ',' + dataMap[i] / totalSum);
    }

}

console.log("value,Number");

var fileName = __dirname + "/" + process.argv[2]
var rs = fs.createReadStream(fileName);
parser = parse({columns: true}, parseData.bind(this, fileName));
rs.pipe(parser);


// fs.readdirSync(__dirname).forEach(function(elm){
//     if(!elm.match(/.csv$/)){
//         return;
//     }

//     var rs = fs.createReadStream(__dirname+ "/" +elm);

//     parser = parse({columns: true}, parseData.bind(this, elm));
//     rs.pipe(parser);

// });
