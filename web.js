var express = require('express');
var fs = require('fs');
var htmlfile = "index.html";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
    // var fs = require('fs');
    var prueba = fs.readFileSync(htmlfile).toString();
    response.send(prueba);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

