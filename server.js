/*
    Her opbygges et simpelt RESTful API vha. Node-modulerne Express og FS.
    Modulerne skal naturligvis installeres først, før at API'et virker korrekt.

    Da API'et som sagt er RESTful, indeholder det både GET, POST, og DELETE requests.

    Anvend evt. Postman til at demonstrere POST og DELETE Reqs.
*/

var express = require('express'); //Inkluderer Express-modulet
var app = express();
var fs = require("fs"); //Inkluderer FS-modulet

/*
    GET REQUEST.
    API'et kan tilgås lokalt på http://127.0.0.1:8081/listUsers
*/

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

/*
    POST REQUEST.
    Nu prøver vi at indsætte en ny bruger til API'et.
    Indtast i Postman: http://127.0.0.1:8081/addUser

    Den nye bruger er som det første prædefineret som JSON herunder.
*/

var user = {
    "user4" : {
       "name" : "Mokkafugl",
       "password" : "password4",
       "profession" : "Kaeledyr",
       "id": 4
    }
 }

app.post('/addUser', function (req, res) {
    // Først indlæses de eksisterende brugere, som ved GET Req.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        // Så tilføjes den nye bruger til json-filen.
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end(JSON.stringify(data));
    });
 })

 /*
    DELETE REQUEST.
    For at holde det simpelt, så demonstreres her, hvordan man sletter id 2 i API'et.
    Indtast i Postman: http://127.0.0.1:8081/deleteUser
 */

var id = 2;

app.delete('/deleteUser', function (req, res) {
    // Først indlæses de eksisterende brugere.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       // Så slettes brugeren med det angivne id nr.
       data = JSON.parse( data );
       delete data["user" + id];
       console.log( data );
       res.end(JSON.stringify(data));
   });
})

/*
    SERVER.
    App'en sættes til at lyttes på port 8081 og udskriver til konsollen.
*/

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("INFO: App lytter på ", host, port)
})