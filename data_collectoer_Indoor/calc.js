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

    data.sort();

    name = name.replace('_', ',');
    name = name.match(/\d+,?\d+/)
    if(name == null)
        return;
    name = name[0];
    // console.log("length: "+ data.length);
    // console.log("median:"+ data.length / 2 )
    var row = "";
    row += '"' + name + '",';
    row += data [ Math.round(data.length / 2 )] + ",";
    row += data [ Math.round(data.length / 4 )] + ",";
    row += data [ Math.round(( data.length / 4 ) * 3 )]+ ",";
    row += data [data.length - 1]+ ",";
    row += data [0];

    console.log(row);

}

console.log("meter,median,upKvart,lwKvart,max,min");

fs.readdirSync(__dirname).forEach(function(elm){
    if(!elm.match(/.csv$/)){
        return;
    }

//    console.log(elm);
    var rs = fs.createReadStream(__dirname+ "/" +elm);

    parser = parse({columns: true}, parseData.bind(this, elm));
    rs.pipe(parser);

});




// var rs = fs.createReadStream(__dirname+'/test000m.csv');

// parser = parse({columns: true}, parseData);
// rs.pipe(parser);

//console.log(JSON.stringify(input, null, "  "))
