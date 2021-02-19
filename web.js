// version feb 2021 with code

var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());


// Include the router middleware from express web app development page 58
app.use(app.router); 

// Mark the public dir as a static dir
app.use(express.static('./public'));
app.use(express.static('./data'));
console.log('WEB.JS --> Los directorios public y data se han vuelto publicos.'); 

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


// reads codes and verify that is approved 
var codes = [];
var text = fs.readFileSync("./codes.txt", "utf-8");
//codes = text.split("\n");
codes = text.split(",");
var last = codes.pop();
console.log ('codes array :');
console.log (codes);



var noau = "noautho.html";
app.get('/noautho', function(req, res){
    res.send(fs.readFileSync(noau).toString());
});

/* Processes httpgetrequest on ticker and stores result on file ./data/pbv.json by calling run_mod module
   and also loads visualization by sending in a response the file that contains visualization program */
var pbvk = "display.html";

var ticker_global = "";

app.get('/dataquery', 
	function(req, res, next) {

	    //a11n borrar archivos ./data/ para no mezclar titulos 
	    fs.writeFile('./data/nombre.json', '', function(){console.log('WEB.JS --> Done empty ./data/nombre.json')});
	    fs.writeFile('./data/precio.json', '', function(){console.log('WEB.JS --> Done empty ./data/precio.json')});
	    fs.writeFile('./data/trim.json', '', function(){console.log('WEB.JS --> Done empty ./data/trim.json')});
	    fs.writeFile('./data/anno.json', '', function(){console.log('WEB.JS --> Done empty ./data/anno.json')});
	    fs.writeFile('./data/l_date.json', '', function(){console.log('WEB.JS --> Done empty ./data/l_date.json')});
	    
	    var cc = req.query.c;
	    console.log ('cc : ' + cc);
	    var include = codes.includes(cc);
	    console.log ('WEB.JS --> include : ' + include);

	    if (include == false) {
		// not authorized
		res.redirect('/noautho');
		var ticker = '';
		var start = '';
		var end = '';
		var parameters = [];
		console.log ('WEB.JS --> ticker, start, end y parameters han sido borrados en web.js.');

	    }
	    else{
		var ticker = req.query.q;    // guarda el ticker
		var start = req.query.s;     // guarda fecha inicial
		var end = req.query.e;       // gaurda fecha final
		var parameters = [ticker, start, end];

		ticker_global = ticker.toString();
		
		console.log ('WEB.JS --> Se hace un query de: ' + parameters[0] + ' desde: ' + parameters[1] + ' hasta: ' + parameters[2] + ' .'); 
		var run_mod = require('./run_mod.js');  // ejecuta funcion run_mod con parametro ticker
		run_mod(parameters, function(data) {
		    //		console.log('contendio de data es: ' + data);
		    if (data != undefined) console.log ('WEB.JS --> data tiene contenido');
		    next();
		});
	    }
	},

	/* Middleware: serves new file pbv.html which loads d3 visualization 
	   with pbv information in json format from newly created file pbv.json*/

	function(req, res, next) {

	    console.log ('WEB.JS --> Middleware de display.html ejecutado.');
	    res.send(fs.readFileSync(pbvk).toString()); // NO SERIA MEJOR HACER UN REDIRECT A /pbvg no carga la primera vez en chrome con el request, solo con un reload...

	    /* serves ticker para display.html */ 

	    app.get('/tick', function(req, res, next){
		console.log ('WEB.JS --> ticker_global ha sido servido.');
		console.log ('WEB.JS --> ticker_global = ', ticker_global);
		res.send(ticker_global);
	    });

	    /* serves ./data/pbv.json file that is requested in pbv.html iframe en display.html */ 

	    var datapbv = "./data/pbv.json";
	    app.get('/datapbv', function(req, res, next){
		console.log ('WEB.JS --> Datos de pbv han sido servidos.');
		res.send(fs.readFileSync(datapbv).toString());
	    });


	    /* serves ./data/pe.json file that is requested in pe.html iframe en display.html */ 

	    var datape = "./data/pe.json";
	    app.get('/datape', function(req, res, next){
		console.log ('WEB.JS --> Datos de pe han sido servidos.');
		res.send(fs.readFileSync(datape).toString());
	    });

	    /* serves .data/evrevenue.json file that is requested in evrev.html iframe en display.html */

	    var dataevr = "./data/evrevenue.json";
	    app.get('/dataevr', function(req, res){
		console.log ('WEB.JS --> Datos de evrevenue han sido servidos.');
		res.send(fs.readFileSync(dataevr).toString());
	    });


	    /* serves .data/evebitda.json file that is requested in eveb.html iframe en display.html */

	    var dataevebitda = "./data/evebitda.json";
	    app.get('/dataeve', function(req, res){
		console.log ('WEB.JS --> Datos de evebitda han sido servidos.');
		res.send(fs.readFileSync(dataevebitda).toString());
	    });


	    /* serves .data/bbg.json file that is requested in bbg.html iframe en display.html */

	    var databbga = "./data/bbg.json";
	    app.get('/databbg', function(req, res){
		console.log ('WEB.JS --> Datos de bbg han sido servidos.');
		res.send(fs.readFileSync(databbga).toString());
	    });

	    /* serves .data/goodassets.json file that is requested in goodasset.html iframe en display.html */

	    var datagoas = "./data/goodassets.json";
	    app.get('/datagooasset', function(req, res){
		console.log ('WEB.JS --> Datos de goodasset han sido servidos.');
		res.send(fs.readFileSync(datagoas).toString());
	    });

	    /* serves .data/equity.json file that is requested in equity.html iframe en display.html */

	    var dataequity = "./data/equity.json";
	    app.get('/dataequity', function(req, res){
		console.log ('WEB.JS --> Datos de equity han sido servidos.');
		res.send(fs.readFileSync(dataequity).toString());
	    });

	    /* serves .data/eqdivs.json file that is requested in eqaccumdiv.html iframe en display.html */

	    var dataequitydiv = "./data/eqdivs.json";
	    app.get('/dataeqdiv', function(req, res){
		console.log ('WEB.JS --> Datos de eqdivs han sido servidos.');
		res.send(fs.readFileSync(dataequitydiv).toString());
	    });


	    /* serves .data/eqdivs.json file that is requested in accumdiv.html iframe en display.html */

	    var datadivaccum = "./data/accumdivs.json";
	    app.get('/datadivaccum', function(req, res){
		console.log ('WEB.JS --> Datos de accumdivs han sido servidos.');
		res.send(fs.readFileSync(datadivaccum).toString());
	    });


	    /* serves .data/divs.json file that is requested in divs.html iframe en display.html */

	    var datadivs = "./data/divs.json";
	    app.get('/datadiv', function(req, res){
		console.log ('WEB.JS --> Datos de divs han sido servidos.');
		res.send(fs.readFileSync(datadivs).toString());
	    });

	    /* serves .data/margin_ebitda.json file that is requested in ebitda_margin.html iframe en display.html */

	    var datamargin = "./data/margin_ebitda.json";
	    app.get('/datamar', function(req, res){
		console.log ('WEB.JS --> Datos de margenes han sido servidos.');
		res.send(fs.readFileSync(datamargin).toString());
	    });

	    /* serves .data/margin_net.json file that is requested in net_margin.html iframe en display.html */

	    var datamargindo = "./data/margin_net.json";
	    app.get('/datamarnet', function(req, res){
		console.log ('WEB.JS --> Datos de margenes han sido servidos.');
		res.send(fs.readFileSync(datamargindo).toString());
	    });

	    /* serves .data/shares_out.json file that is requested in shares_out.html iframe en display.html */

	    var datash = "./data/shares_out.json";
	    app.get('/datashares', function(req, res){
		console.log ('WEB.JS --> Datos de shares coomon outstanding han sido servidos.');
		res.send(fs.readFileSync(datash).toString());
	    });

	    /* serves .data/unit_shares_out.json file that is requested in shares_out.html iframe en display.html */

	    var datashun = "./data/unit_shares_out.json";
	    app.get('/dataunitshares', function(req, res){
		console.log ('WEB.JS --> Datos de unit shares common outstanding han sido servidos.');
		res.send(fs.readFileSync(datashun).toString());
	    });


	    

	    /* serves .data/nombre.json file that has name of companyto be shown in display.html */

	    var nom = "./data/nombre.json";
	    app.get('/nomb', function(req, res){
		console.log ('WEB.JS --> Datos de nombre han sido servidos.');
		res.send(fs.readFileSync(nom).toString());
		console.log ('WEB.JS --> res = %j', res);
	    });
	    
	    /* serves .data/precio.json file that has the last price used to calculate data to be shown in display.html */

	    var prec = "./data/precio.json";
	    app.get('/precio', function(req, res){
		console.log ('WEB.JS --> Datos de precio han sido servidos.');
		res.send(fs.readFileSync(prec).toString());
	    });

	    /* serves .data/l_date.json file that has the last date used to calculate data to be shown in display.html */

	    var lastdate = "./data/l_date.json";
	    app.get('/ldate', function(req, res){
		console.log ('WEB.JS --> Datos de lastDate han sido servidos.');
		res.send(fs.readFileSync(lastdate).toString());
	    });

	    /* serves .data/anno.json file that has the last year used to calculate data to be shown in display.html */

	    var anio = "./data/anno.json";
	    app.get('/an', function(req, res){
		console.log ('WEB.JS --> Datos de anno han sido servidos.');
		res.send(fs.readFileSync(anio).toString());
	    });

	    /* serves .data/trim.json file that has the last quarter used to calculate data to be shown in display.html */

	    var quart = "./data/trim.json";
	    app.get('/tri', function(req, res){
		console.log ('WEB.JS --> Datos de trimestre han sido servidos.');
		res.send(fs.readFileSync(quart).toString());
	    });

	    

	    /* ----------------------------------------------------------------------------------------------------------- */
	    /* ----------------------------------------------------------------------------------------------------------- */
	    /* ----------------------------------------------------------------------------------------------------------- */
	    /* ----------------------------------------------------------------------------------------------------------- */
	    


	    /* Multiple Charts */

	    var pbvka = "pbv.html";
	    app.get('/pbvg', function(req, res, next){
		console.log ('WEB.JS --> Grafico de pbv ha sido llamado.');
		res.send(fs.readFileSync(pbvka).toString());
	    });

	    var peka = "pe.html";
	    app.get('/peg', function(req, res, next){
		console.log ('WEB.JS --> Grafico de pe ha sido llamado.');
		res.send(fs.readFileSync(peka).toString());
	    });

	    var evrevenue = "evrev.html";
	    app.get('/evrev', function(req, res){
		console.log ('WEB.JS --> Grafico de evrevenue ha sido llamado.');
		res.send(fs.readFileSync(evrevenue).toString());
	    });

	    var evebitda = "eveb.html";
	    app.get('/eve', function(req, res){
		console.log ('WEB.JS --> Grafico de evebitda ha sido llamado.');
		res.send(fs.readFileSync(evebitda).toString());
	    });


	    /* building blocks Charts and page two Charts */

	    var bbga = "bbg.html";
	    app.get('/bbg', function(req, res){
		console.log ('WEB.JS --> Grafico de bbg ha sido llamado.');
		res.send(fs.readFileSync(bbga).toString());
	    });

	    var ev = "ev.html";
	    app.get('/ev', function(req, res){
		console.log ('WEB.JS --> Grafico de ev ha sido llamado.');
		res.send(fs.readFileSync(ev).toString());
	    });

	    var capnd = "capnd.html";
	    app.get('/capnd', function(req, res){
		console.log ('WEB.JS --> Grafico de capnd ha sido llamado.');
		res.send(fs.readFileSync(capnd).toString());
	    });

	    var ebitda = "ebitda.html";
	    app.get('/ebitda', function(req, res){
		console.log ('WEB.JS --> Grafico de ebitda ha sido llamado.');
		res.send(fs.readFileSync(ebitda).toString());
	    });

	    var mktcap = "mktcap.html";
	    app.get('/mktcap', function(req, res){
		console.log ('WEB.JS --> Grafico de mktcap ha sido llamado.');
		res.send(fs.readFileSync(mktcap).toString());
	    });

	    var goodasset = "goodasset.html";
	    app.get('/goodasset', function(req, res){
		console.log ('WEB.JS --> Grafico de goodasset ha sido llamado.');
		res.send(fs.readFileSync(goodasset).toString());
	    });

	    var equi = "equity.html";
	    app.get('/equity', function(req, res){
		console.log ('WEB.JS --> Grafico de equity ha sido llamado.');
		res.send(fs.readFileSync(equi).toString());
	    });

	    var eqacdiv = "eqaccumdiv.html";
	    app.get('/eqacdiv', function(req, res){
		console.log ('WEB.JS --> Grafico de equity y dividendos acumulados ha sido llamado.');
		res.send(fs.readFileSync(eqacdiv).toString());
	    });

	    var divsaccum = "divsaccum.html";
	    app.get('/divsaccum', function(req, res){
		console.log ('WEB.JS --> Grafico de dividendos acumulados ha sido llamado.');
		res.send(fs.readFileSync(divsaccum).toString());
	    });

	    var divs = "divs.html";
	    app.get('/divs', function(req, res){
		console.log ('WEB.JS --> Grafico de dividendos ha sido llamado.');
		res.send(fs.readFileSync(divs).toString());
	    });

	    var mars = "margen_ebitda.html";
	    app.get('/mars', function(req, res){
		console.log ('WEB.JS --> Grafico de margen_ebitda ha sido llamado.');
		res.send(fs.readFileSync(mars).toString());
	    });

	    var marso = "margen_neto.html";
	    app.get('/marso', function(req, res){
		console.log ('WEB.JS --> Grafico de margen_neto ha sido llamado.');
		res.send(fs.readFileSync(marso).toString());
	    });

	    var sho = "shares_out.html";
	    app.get('/sho', function(req, res){
		console.log ('WEB.JS --> Grafico de shares_outstanding ha sido llamado.');
		res.send(fs.readFileSync(sho).toString());
	    });




	    
	    /* building blocks history charts */

	    var bbga_history = "bbg_history.html";
	    app.get('/bbg_history', function(req, res){
		console.log ('WEB.JS --> Grafico de bbg_history ha sido llamado.');
		res.send(fs.readFileSync(bbga_history).toString());
	    });




	    
	    /* todo: pobar si debemios poner res.end(); */
	    
	}
       );

/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
    console.log("Listening on " + port);
});

