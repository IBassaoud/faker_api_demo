const { response } = require('express');
const express = require('express');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const port = 8080;

//Affiche mon fichier HTML 
app.get("/", function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('faker.html', function(err, data){
        if(err) throw err;
        res.end(data);
    });
});

//recupère les données envoyés en paramètres et concatène la quantité demandé
app.get("/fakeprofile", function(req, res){
    let quantity = req.query.quantity;
    fetch('https://fakerapi.it/api/v1/images?_quantity='+quantity)
    .then(
        reponse => reponse.json()
    )
    .then(
        reponse2 => res.json(reponse2.data)
    )
});

app.listen(port, () => {
    console.log('\nServer started at http://localhost:' + port);
});
