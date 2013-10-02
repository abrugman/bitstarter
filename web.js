var express = require('express');
var fs = require('fs');



var htmlfile = "index.html";
var app = express.createServer(express.logger());
app.get('/', function(request, response) {
    var prueba = fs.readFileSync(htmlfile).toString();
    response.send(prueba);
});


/* Inserted another two pages
   Source : https://class.coursera.org/startup-001/forum/thread?thread_id=5395
   Recommendation: really should learn a template engine */


/* Page 2 */

var start_html = "start.html";
app.get('/start', function(req, res){
   res.send(fs.readFileSync(start_html).toString());
});



/* Example chart svg */

var chart = "yes.svg";
app.get('/yes', function(req, res){
   res.send(fs.readFileSync(chart).toString());
});


/* EvEbitda Chart */

var evebitda = "EvEb.html";
app.get('/eve', function(req, res){
   res.send(fs.readFileSync(evebitda).toString());
});


/* EvEbitda Chart Data */

var dataevebitda = "EvEbitdaVarios.txt";
app.get('/dataeve', function(req, res){
   res.send(fs.readFileSync(dataevebitda).toString());
});


/* pbv Chart */

var pbvk = "pbv.html";
app.get('/pbvg', function(req, res){
   res.send(fs.readFileSync(pbvk).toString());
});


/* pbv Chart Data */

var datapbv = "pbv3.json";
app.get('/datapbvg', function(req, res){
   res.send(fs.readFileSync(datapbv).toString());
});



/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
  console.log("Listening on " + port);
});

