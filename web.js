var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());


// Include the router middleware from express web app development page 58
app.use(app.router); 

// Mark the public dir as a static dir
app.use(express.static('./public'));
app.use(express.static('./data'));
console.log('Los directorios public y data se han vuelto publicos.'); 

// var htmlfile = "index.html";
var htmlfile = "index.html";
app.get('/', function(request, response) {
    var prueba = fs.readFileSync(htmlfile).toString();
    response.send(prueba);
});


/* Inserted another two pages
   Source : https://class.coursera.org/startup-001/forum/thread?thread_id=5395
   Recommendation: really should learn a template engine */


/* Page 2 */

// var start_html = "start.html";
var start_html = "start.html";
app.get('/start', function(req, res){
   res.send(fs.readFileSync(start_html).toString());
});



/* Example chart svg */

var chart = "./public/images/yes.svg";
app.get('/yes', function(req, res){
   res.send(fs.readFileSync(chart).toString());
});





/* Processes httpgetrequest on ticker and stores result on file ./data/pbv.json by calling run_mod module
and also loads visualization by sending in a response the file that contains visualization program */
var pbvk = "display.html";
app.get('/dataquery', 
	function(req, res, next) {
	    var ticker = req.query.q;    // guarda el ticker
	    var run_mod = require('./run_mod.js');  // ejecuta la funcion run_mod con el parametro ticker = KO
	    run_mod(ticker, function(data) {
//		console.log('contendio de data es: ' + data);
		if (data != undefined) console.log ('data tiene contenido');
		next();
	    });

	},

/* Middleware: serves new file pbv.html which loads d3 visualization 
   with pbv information in json format from newly created file pbv.json*/

	function(req, res, next) {
	    console.log ('Middleware de display.html ejecutado.');
	    res.send(fs.readFileSync(pbvk).toString()); // NO SERIA MEJOR HACER UN REDIRECT A /pbvg no carga la primera vez en chrome con el request, solo con un reload...
	});


/* Middleware: serves new file pbv.html which loads d3 visualization 
   with pbv information in json format from newly created file pbv.json
app.get('/dataquery', function(req, res, next) {
    console.log ('imprimio prueba!!!!!!!!!!!!!!!!!!!!!!!!!!');
    res.send(fs.readFileSync(pbvk).toString()); // NO SERIA MEJOR HACER UN REDIRECT A /pbvg porque no esta cargando la primera vez en chrome con el request, solo con un reload...
});*/




/* serves ./data/pbv.json file that is requested in pbv.html iframe en display.html */ 

var datapbv = "./data/pbv.json";
app.get('/datapbv', function(req, res, next){
    console.log ('Datos de pbv han sido servidos.');
    res.send(fs.readFileSync(datapbv).toString());
});


/* serves ./data/pe.json file that is requested in pe.html iframe en display.html */ 

var datape = "./data/pe.json";
app.get('/datape', function(req, res, next){
    console.log ('Datos de pe han sido servidos.');
    res.send(fs.readFileSync(datape).toString());
});

/* serves .data/evrevenue.json file that is requested in evrev.html iframe en display.html */

var dataevr = "./data/evrevenue.json";
app.get('/dataevr', function(req, res){
    console.log ('Datos de evrevenue han sido servidos.');
   res.send(fs.readFileSync(dataevr).toString());
});


/* serves .data/evebitda.json file that is requested in eveb.html iframe en display.html */

var dataevebitda = "./data/evebitda.json";
app.get('/dataeve', function(req, res){
    console.log ('Datos de evebitda han sido servidos.');
   res.send(fs.readFileSync(dataevebitda).toString());
});


/* Multiple Charts */

var pbvka = "pbv.html";
app.get('/pbvg', function(req, res, next){
    console.log ('Grafico de pbv ha sido llamado.');
    res.send(fs.readFileSync(pbvka).toString());
});

var peka = "pe.html";
app.get('/peg', function(req, res, next){
    console.log ('Grafico de pe ha sido llamado.');
    res.send(fs.readFileSync(peka).toString());
});

var evrevenue = "evrev.html";
app.get('/evrev', function(req, res){
    console.log ('Grafico de evrevenue ha sido llamado.');
   res.send(fs.readFileSync(evrevenue).toString());
});

var evebitda = "eveb.html";
app.get('/eve', function(req, res){
    console.log ('Grafico de evebitda ha sido llamado.');
   res.send(fs.readFileSync(evebitda).toString());
});







/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
  console.log("Listening on " + port);
});

