module.exports = function (tick) {

    return function (req, res, next) {


	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	    host     : 'stockety-db-west.c1k1sjidqusd.us-west-2.rds.amazonaws.com',
	    user     : 'bogota1913',
	    password : 'medellin1922',
	    database : 'sto',
	    port : '3306',
	    //  debug : true,  
	    multipleStatements: true
	});
	
	connection.connect();

	// Para mostrar todas las filas en un "array of objects"

	connection.query('CALL process_data("' + tick +'", "2011-06-01", "2013-08-20"); SELECT DATE_FORMAT(date, "%m/%d/%y") AS "date", close, average, avup, avdo FROM pbv', function(err, rows) {
	    if (err) throw err;
	    
	    for (var i in rows) {
		console.log(rows[i]);
	    }
	});
	
	connection.end();

	}


};
