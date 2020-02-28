const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log('Serveur lancé sur le port 3000.')
});

app.use(express.static('files'));