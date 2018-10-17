/*
    Her opbygges et simpelt RESTful API vha. Node-modulerne Express og FS.
    Modulerne skal naturligvis installeres først, før at API'et virker korrekt.

    Da API'et som sagt er RESTful, indeholder det både GET, POST, og DELETE requests.
*/

var express = require('express'); //Inkluderer Express-modulet
var app = express();
var fs = require("fs"); //Inkluderer FS-modulet

/*
    GET REQUEST
    API'et kan tilgås lokalt på http://127.0.0.1:8081/listUsers
*/
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

// App'en sættes til at lyttes på port 8081 og udskriver til konsollen.
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App lytter på ", host, port)
})