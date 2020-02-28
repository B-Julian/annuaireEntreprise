var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "operateur",
    password: "password",
    database: "bdd_annuaire"
});

data = con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM `employes` WHERE `service_id` = 1", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});