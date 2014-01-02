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

    connection.connect();


    // PARA PREVENIR INJECTIONS HACER UNA PRUEBA QUE EL TICK.LENGTH ES MENOR A SIETE Y EN UN FUTURO QUE DATES ES IGUAL A DIEZ????

    // For Security
    var user_input = tick;
    var sql = 'CALL process_data(' + connection.escape(user_input) + ', "2011-06-01", "2013-08-20")';

    // Llama Stored Procedure process_data para generar tables temporales

//  query viejo para referencia: connection.query('CALL process_data("' + tick +'", "2011-06-01", "2013-08-20")');
    connection.query(sql);


    // obtiene la informacion de EVREVENUES y la guarda en archivo evrevenue.json en directorio ./data/ 

    var er = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM evrevenues', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/evrevenue.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	er = JSON.stringify(rows);
	console.log('El archivo evrevenue.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });

    // obtiene la informacion de EVEBITDA y la guarda en archivo evebitda.json en directorio ./data/ 

    var eb = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM evebitda', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/evebitda.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	eb = JSON.stringify(rows);
	console.log('El archivo evebitda.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });


    // obtiene la informacion de PE y la guarda en archivo pe.json en directorio ./data/ 

    var pe = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM pe', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/pe.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	pe = JSON.stringify(rows);
	console.log('El archivo pe.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
    });


    // obtiene la informacion de PBV y la guarda en archivo pbv.json en directorio ./data/ 
    
    var pb = [];

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM pbv', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/pbv.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	pb = JSON.stringify(rows);
	console.log('El archivo pbv.json ha sido generado y los datos han sido guardados en una variable');
	callback(pb);
    });



    // obtiene la informacion de bbg y la guarda en archivo bbg.json en directorio ./data/ 

    var bb = [];  

    connection.query('SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", id, mkt_cap, ev, net_debt, ebitda12m, multiple FROM bbg', function(err, rows) {
	if (err) throw err;
	fs.writeFile('./data/bbg.json', JSON.stringify(rows), function (err) {if (err) throw err;});
	bb = JSON.stringify(rows);
	console.log('El archivo bbg.json ha sido generado y los datos han sido guardados en una variable');
//	callback(pe);
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
