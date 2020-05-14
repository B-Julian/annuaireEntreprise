const express = require('express'),
  app = express(),
  fs = require("fs");
var mysql = require('mysql'),
  {Personne} = require("./Personne.js");
var personnes = [];
  

app.listen(3000, function() {
  console.log('Serveur lancé sur le port 3000.')
});

app.use(express.static('./'));

var conn = mysql.createConnection({
  host: "192.168.1.83",
  user: "operateur",
  password: "motdepasse",
  database: "dbpanneaux"
});

data = conn.connect(async function(err) {
  if (err) throw err;
  conn.query("SELECT idpanneaux, longueur, largeur, chute FROM `panneaux`", function (err, result, fields) {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
      personnes.push(new Personne(result[i].idpanneaux, result[i].longueur, result[i].largeur, result[i].chute))
      };
      exports.personnes = personnes;
      /*if (personnes != null) {
        eval(fs.readFileSync("./main.js").toString());
      }*/
      
  });
});


/*module.exports.loadPersonnes = function(){
  return new Promise(function(resolve){
    conn.connect(function(err) {
      if (err) throw err;
      conn.query("SELECT idpanneaux, longueur, largeur, chute FROM `panneaux`", function (err, result, fields) {
          if (err) throw err;
          var personnes = [];
          for (var i = 0; i < result.length; i++) {
            personnes.push(new Personne(result[i].idpanneaux, result[i].longueur, result[i].largeur, result[i].chute))
          }
          resolve(personnes);
      });
    });
  });
}*/

//le passage en paramètre des données de la requête sql dans un objet de la classe Personne fonctionne.
//require quelque chose dans index.html ne fonctionne pas.
