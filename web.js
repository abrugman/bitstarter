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

var about_html = "about.html";
app.get('/about', function(req, res){
   res.send(fs.readFileSync(about_html).toString());
});


/* Page 3 */

var start_html = "start.html";
app.get('/start', function(req, res){
   res.send(fs.readFileSync(start_html).toString());
});


/* Continue */

var port = process.env.PORT || 8080;
/* var port = process.env.PORT || 5000;*/
app.listen(port, function() {
  console.log("Listening on " + port);
});

