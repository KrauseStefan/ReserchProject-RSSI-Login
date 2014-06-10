// node samples/sample.js

var parse = require('csv').parse;
var fs = require('fs');

var rs = fs.createReadStream(__dirname+'/test000.csv');

parser = parse({columns: true}, function(err, data){
  console.log(data);
})
rs.pipe(parser);

//console.log(JSON.stringify(input, null, "  "))
