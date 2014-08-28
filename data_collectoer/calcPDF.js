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
//    console.log(data);

    while(data.length > 0){
    	var value = data.pop();
    	if(dataMap[value]){
    		dataMap[value]++;
    	}else{
    		dataMap[value] = 1;
    	}
    }

    for(var i = 0 in dataMap){
	    console.log(i + ',' + dataMap[i]);
    }

    // name = name.replace('_', ',');
    // name = name.match(/\d+,?\d+/)
    // if(name == null)
    //     return;
    // name = name[0];
    // // console.log("length: "+ data.length);
    // // console.log("median:"+ data.length / 2 )
    // var row = "";
    // row += '"' + name + '",';
    // row += data [ Math.round(data.length / 2 )] + ",";
    // row += data [ Math.round(data.length / 4 )] + ",";
    // row += data [ Math.round(( data.length / 4 ) * 3 )]+ ",";
    // row += data [data.length - 1] + ",";
    // row += data [0];

    // console.log(row);

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
