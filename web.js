var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());


// Include the router middleware from express web app development page 58
app.use(app.router); 


// var htmlfile = "index.html";
var htmlfile = "start.html";
app.get('/', function(request, response) {
    var prueba = fs.readFileSync(htmlfile).toString();
    response.send(prueba);
});


/* Inserted another two pages
   Source : https://class.coursera.org/startup-001/forum/thread?thread_id=5395
   Recommendation: really should learn a template engine */


/* Page 2 */

// var start_html = "start.html";
var start_html = "index.html";
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


/* Processes httpgetrequest on ticker and stores result on file ./data/pbv.json by calling run_mod module
and also loads visualization by sending in a response the file that contains visualization program */
var pbvk = "pbv.html";
app.get('/dataquery', 
	function(req, res, next) {
	    var ticker = req.query.q;    // guarda el ticker
	    var run_mod = require('./run_mod.js');  // ejecuta la funcion run_mod con el parametro ticker = KO
	    run_mod(ticker, function(data) {
		console.log('contendio de data es: ' + data);
		next();
	    });

	},

/* Middleware: serves new file pbv.html which loads d3 visualization 
   with pbv information in json format from newly created file pbv.json*/

	function(req, res, next) {
	    console.log ('imprimio prueba!!!!!!!!!!!!!!!!!!!!!!!!!!');
	    res.send(fs.readFileSync(pbvk).toString()); // NO SERIA MEJOR HACER UN REDIRECT A /pbvg no carga la primera vez en chrome con el request, solo con un reload...
	});


/* Middleware: serves new file pbv.html which loads d3 visualization 
   with pbv information in json format from newly created file pbv.json
app.get('/dataquery', function(req, res, next) {
    console.log ('imprimio prueba!!!!!!!!!!!!!!!!!!!!!!!!!!');
    res.send(fs.readFileSync(pbvk).toString()); // NO SERIA MEJOR HACER UN REDIRECT A /pbvg porque no esta cargando la primera vez en chrome con el request, solo con un reload...
});*/




/* serves ./data/pbv.json file that is requested in pbv.html graph */ 

var datapbv = "./data/pbv.json";
app.get('/datapbv', function(req, res, next){
    res.send(fs.readFileSync(datapbv).toString());
});



//app.get('/pbvg', function(req, res, next){
//    res.send(fs.readFileSync(pbvk).toString());
//});









/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
  console.log("Listening on " + port);
});

