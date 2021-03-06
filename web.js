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

var logo = "./public/htmls/slow.html";
app.get('/logo', function(req, res){
   res.send(fs.readFileSync(logo).toString());
});





/* Processes httpgetrequest on ticker and stores result on file ./data/pbv.json by calling run_mod module
and also loads visualization by sending in a response the file that contains visualization program */
var pbvk = "display.html";
app.get('/dataquery', 
	function(req, res, next) {
	    var ticker = req.query.q;    // guarda el ticker
	    var start = req.query.s;     // guarda fecha inicial
	    var end = req.query.e;       // gaurda fecha final
	    var parameters = [ticker, start, end];
	    console.log ('Se hace un query de: ' + parameters[0] + ' desde: ' + parameters[1] + ' hasta: ' + parameters[2] + ' .'); 
	    var run_mod = require('./run_mod.js');  // ejecuta funcion run_mod con parametro ticker
	    run_mod(parameters, function(data) {
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


/* serves .data/bbg.json file that is requested in bbg.html iframe en display.html */

var databbga = "./data/bbg.json";
app.get('/databbg', function(req, res){
    console.log ('Datos de bbg han sido servidos.');
   res.send(fs.readFileSync(databbga).toString());
});

/* serves .data/nombre.json file that has name of companyto be shown in display.html */

var nom = "./data/nombre.json";
app.get('/nomb', function(req, res){
    console.log ('Datos de nombre han sido servidos.');
    res.send(fs.readFileSync(nom).toString());
});

/* serves .data/precio.json file that has the last price used to calculate data to be shown in display.html */

var prec = "./data/precio.json";
app.get('/precio', function(req, res){
    console.log ('Datos de precio han sido servidos.');
    res.send(fs.readFileSync(prec).toString());
});

/* serves .data/l_date.json file that has the last date used to calculate data to be shown in display.html */

var lastdate = "./data/l_date.json";
app.get('/ldate', function(req, res){
    console.log ('Datos de lastDate han sido servidos.');
    res.send(fs.readFileSync(lastdate).toString());
});

/* serves .data/anno.json file that has the last year used to calculate data to be shown in display.html */

var anio = "./data/anno.json";
app.get('/an', function(req, res){
    console.log ('Datos de anno han sido servidos.');
    res.send(fs.readFileSync(anio).toString());
});

/* serves .data/trim.json file that has the last quarter used to calculate data to be shown in display.html */

var quart = "./data/trim.json";
app.get('/tri', function(req, res){
    console.log ('Datos de trimestre han sido servidos.');
    res.send(fs.readFileSync(quart).toString());
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


/* building blocks Charts and page two Charts */

var bbga = "bbg.html";
app.get('/bbg', function(req, res){
    console.log ('Grafico de bbg ha sido llamado.');
   res.send(fs.readFileSync(bbga).toString());
});

var ev = "ev.html";
app.get('/ev', function(req, res){
    console.log ('Grafico de ev ha sido llamado.');
   res.send(fs.readFileSync(ev).toString());
});

var capnd = "capnd.html";
app.get('/capnd', function(req, res){
    console.log ('Grafico de capnd ha sido llamado.');
   res.send(fs.readFileSync(capnd).toString());
});

var ebitda = "ebitda.html";
app.get('/ebitda', function(req, res){
    console.log ('Grafico de ebitda ha sido llamado.');
   res.send(fs.readFileSync(ebitda).toString());
});

var mktcap = "mktcap.html";
app.get('/mktcap', function(req, res){
    console.log ('Grafico de mktcap ha sido llamado.');
   res.send(fs.readFileSync(mktcap).toString());
});







/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
  console.log("Listening on " + port);
});

