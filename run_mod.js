module.exports = function (tick, callback) {

    var fs = require('fs');
    var mysql      = require('mysql');

    var connection = mysql.createConnection({
	host     : process.env.HOSTDB,
	user     : process.env.USERDB,
	password : process.env.PASSWORDDB,
	database : process.env.DATABASEDB,
	port : process.env.PORTDB,
	multipleStatements: true // BE CAREFUL HERE --> this allows for injection attcks according to node-mysql
    });

    //connection.connect();
    connection.connect(function(error){
	if(error){
            console.log("RUN_MOD.JS --> Couldn't connect :(    Error: " + error);
	} else {
            console.log("RUN_MOD.JS --> Connected successfully~!");
	}    
    });

    
    console.log('RUN_MOD.JS --> ARRAY = ' + tick);
    // PARA PREVENIR INJECTIONS HACER UNA PRUEBA QUE EL TICK.LENGTH ES MENOR A SIETE Y EN UN FUTURO QUE DATES ES IGUAL A DIEZ????

    // For Security
    var user_input = tick[0];
    console.log('RUN_MOD.JS --> ticker es: ' + user_input);
    
 //   var sql = 'CALL process_data(' + connection.escape(user_input) + ', "2011-06-01", "2013-08-20")';
// cambio abril 2014 ponr anterior y borrar siguiente en caso de danno ademas como poner today
    
    var initialDate = '"2012-01-01"';
//    var initialDate = '"' + tick[1] + '"';
//    var initialDate = tick[1];
    console.log('initialDate es: ' + initialDate);

    // para fijar fecha de hoy se requiere el siguiente procedimiento

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
	dd='0'+dd
    } 

    if(mm<10) {
	mm='0'+mm
    } 

    var lastDate = '"' + yyyy + '-' + mm + '-' + dd + '"';
//    var lastDate = '"' + tick[2] + '"';
//    var lastDate = tick[2];
    console.log('lastDate es: ' + lastDate);


    var sql = 'CALL process_data("' + tick[0] + '", "' + tick[1] + '", "' + tick[2] + '")';
    console.log('SQL: ' + sql);

    // Llama Stored Procedure process_data para generar tables temporales

//  SIRVE     connection.query('CALL process_data("' + tick[0] +'", "2011-06-01", "2013-08-20")');
    connection.query(sql);


    // obtiene la informacion de EVREVENUES y la guarda en archivo evrevenue.json en directorio ./data/ 

    var er = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM evrevenues', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/evrevenue.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	er = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo evrevenue.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });

    // obtiene la informacion de EVEBITDA y la guarda en archivo evebitda.json en directorio ./data/ 

    var eb = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM evebitda', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/evebitda.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	eb = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo evebitda.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });


    // obtiene la informacion de PE y la guarda en archivo pe.json en directorio ./data/ 

    var pe = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM pe', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/pe.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	pe = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo pe.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });


    // obtiene la informacion de PBV y la guarda en archivo pbv.json en directorio ./data/ 
    
    var pb = [];

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM pbv', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/pbv.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	pb = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo pbv.json ha sido generado y los datos han sido guardados en una variable');
	callback(pb);
    });



    // obtiene la informacion de bbg y la guarda en archivo bbg.json en directorio ./data/ 

    var bb = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", id, mkt_cap, ev, net_debt, ebitda12m, multiple FROM bbg', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/bbg.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	bb = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo bbg.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });



    // obtiene la informacion de GOODWILLASSETS y la guarda en archivo goodassets.json en directorio ./data/ 

    var ga = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", goodwill, assets, ratio FROM goodasset', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/goodassets.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	ga = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo goodassets.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });


    // obtiene la informacion de EQUITY y la guarda en archivo equity.json en directorio ./data/ 

    var eq = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", equity FROM eqdiv', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/equity.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	eq = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo equity.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });
    

    // obtiene la informacion de DIVIDENDS y la guarda en archivo divs.json en directorio ./data/ 

    var di = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", dividends FROM divi', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/divs.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	di = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo divs.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });

    // obtiene la informacion de DIVIDENDSACCUMULADOS y la guarda en archivo accumdivs.json en directorio ./data/ 

    var da = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", accumdivs FROM eqdiv', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/accumdivs.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	da = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo accumdivs.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });

    
    // obtiene la informacion de EQUITYDIVIDENDS y la guarda en archivo eqdivs.json en directorio ./data/ 

    var ed = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", equity, dividends, accumdivs FROM eqdiv', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/eqdivs.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	ed = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo eqdivs.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });

    // obtiene la informacion de MARGEN EBITDA y la guarda en archivo margin_ebitda.json en directorio ./data/ 

    var ma = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", ebitda_margin FROM margins', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/margin_ebitda.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	ma = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo margin_ebitda.json ha sido generado y los datos han sido guardados en una variable');
	//	callback(pe);
    });


    // obtiene la informacion de MARGEN NETO y la guarda en archivo margin_net.json en directorio ./data/ 

    var mn = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", net_margin FROM margins', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/margin_net.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	mn = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo margin_net.json ha sido generado y los datos han sido guardados en una variable');
	//	callback(pe);
    });

    // obtiene la informacion de SHARES OUTSTANDING y la guarda en archivo shares_out.json en directorio ./data/ 

    var sh = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", common, unit_common FROM shares', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/shares_out.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	sh = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo shares_out.json ha sido generado y los datos han sido guardados en una variable');
	//	callback(pe);
    });

        // obtiene la informacion de UNIT SHARES OUTSTANDING y la guarda en archivo unit_shares_out.json en directorio ./data/ 

    var ush = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", unit_common FROM unit_shares', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/unit_shares_out.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	ush = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo unit_shares_out.json ha sido generado y los datos han sido guardados en una variable');
	//	callback(pe);
    });

    



    
    // obtiene el nombre de la empresa consultada y lo guarda en archivo nombre.json en directorio ./data/ fecha mayo 23 2014 

    var nombre = [];  
    var nuevo_sql = 'SELECT name FROM stock WHERE ticker=' + connection.escape(user_input) + ';';

    connection.query(nuevo_sql, function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/nombre.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	nombre = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo nombre.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });




    // obtiene el ultimo precio de la empresa consultada y lo guarda en archivo precio.json en directorio ./data/ fecha mayo 26 2014 

    var precio = [];
    var sql_precio = 'select close from price inner join stock ON (price.stock_id = stock.id) and (stock.ticker = ' + connection.escape(user_input) + ') order by date desc limit 1;';

    connection.query(sql_precio, function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/precio.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	precio = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo precio.json ha sido generado y los datos han sido guardados en una variable');
    });


    // obtiene la ultima fecha y lo guarda en archivo l_date.json en directorio ./data/ fecha mayo 26 2014 

    var l_date = [];
    var sql_l_date = 'select date from price inner join stock ON (price.stock_id = stock.id) and (stock.ticker = ' + connection.escape(user_input) + ') order by date desc limit 1;';

    connection.query(sql_l_date, function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/l_date.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	l_date = JSON.stringify(rows);
	console.log('RUN_MOD.JS --> El archivo l_date.json ha sido generado y los datos han sido guardados en una variable');
    });





    // obtiene ultimo trimestre y anno pero OJO falta mirar que mire en la tabla correcta dado que no todos las acciones estan en financials_r_i

    var sql_trim = 'SELECT quarter FROM financials_r_i WHERE ticker = ' + connection.escape(user_input) + ' ORDER BY date_end DESC LIMIT 1;';
    var sql_anno = 'SELECT year FROM financials_r_i WHERE ticker = ' + connection.escape(user_input) + ' ORDER BY date_end DESC LIMIT 1;';
    var sql_both = sql_trim + sql_anno;

    connection.query(sql_both, function(err, results) {
	if (err) throw err;
	var trim = results[0];
	var anno = results[1];
	console.log('RUN_MOD.JS --> trim = ' + trim);
	console.log('RUN_MOD.JS --> anno = ' + anno);
	fs.writeFile('./data/trim.json', JSON.stringify(results[0]), function (err) {if (err) throw err;});
	fs.writeFile('./data/anno.json', JSON.stringify(results[1]), function (err) {if (err) throw err;});
    });








    // termina conexion
    

    var ans = er + eb + pb + pe;
    console.log('proceso ans');
//    callback(ans);
    connection.end();
    console.log('coneccion terminada');
};

// NOTE: This program has a particular way to send the data to the browser for visualization. although it sends variable pb as an answer via callback, the web.js
// file does not use this data. Instead, it serves the file .json that this program saved on the server. What are the implications of using files? Or might be 
// better to try to figure it out a way to send the data via AJAX & JQUERY?

// NOTE2: Instead of doing all request in this file, better to call this function from web.js with another parameter as the name of the table to look for !!!! 
// Answer preeliminary: No as it is better to do all queries in one connection since we have an stored procedure that takes some secs to build temporary tables 
