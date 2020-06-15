//Modules
const express = require ('express')
const morgan = require ('morgan')('dev')
const twig = require("twig")
const axios = require('axios')

//Variables globales
const app = express()
const port = 3001
const fetch = axios.create({
    baseURL: 'http://localhost:3000/annuaire'
  });

//Midlewares
app.use(morgan)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
    res.redirect("http://localhost:3001/annuaire")
})

//Liste de tous les membres
app.get('/annuaire', (req, res) => {
    fetch.get('/')
    .then((response) => {
        if (response.data.status == 'success') {
            res.render('employes.twig', {
                title:'Tous les employés',
                employes: response.data.result
            })
        }
        else
            renderError(res, response.data.message)
    })
    .catch((err) => renderError(res, err.message))
})

//Interface de recherche par nom
app.get('/annuaire/search/nom', (req, res) => {
    renderSearch(res, 'nom', 'nom', 'Nom')
})

//Interface de recherche par prénom
app.get('/annuaire/search/prenom', (req, res) => {
    renderSearch(res, 'prénom', 'prenom', 'Prénom')
})

//Interface de recherche par numéro de téléphone
app.get('/annuaire/search/phone', (req, res) => {
    renderSearch(res, 'numéro de téléphone', 'phone', '0xxxxxxxxx')
})

//Interface de recherche par date d'entrée
app.get('/annuaire/search/date', (req, res) => {
    renderSearch(res, "date d'entrée", 'date')
})

//Interface de recherche par service
app.get('/annuaire/search/service', (req, res) => {
    renderSearch(res, 'service', 'service', 'Service-du-contact')
})

//Recherche par nom
app.get('/annuaire/search/nom=:id', (req, res) => {
    fetch.get('/search/nom='+req.params.id)
    .then((response) => {
        renderCheck(res, 'nom', 'nom', response, req.params.id)
    })
    .catch((err) => renderError(res, err.message))
})

//Recherche par prénom
app.get('/annuaire/search/prenom=:id', (req, res) => {
    fetch.get('/search/prenom='+req.params.id)
    .then((response) => {
        renderCheck(res, 'prénom', 'prenom', response, req.params.id)
    })
    .catch((err) => renderError(res, err.message))
})

//Recherche par numéro de téléphone
app.get('/annuaire/search/phone=:id', (req, res) => {
    fetch.get('/search/phone='+req.params.id)
    .then((response) => {
        renderCheck(res, 'numéro de téléphone', 'phone', response,  req.params.id)
    })
    .catch((err) => renderError(res, err.message))
})

//Recherche par service
app.get('/annuaire/search/service=:id', (req, res) => {
    fetch.get('/search/service='+req.params.id)
    .then((response) => {
        renderCheck(res, 'service', 'service', response,  req.params.id)
    })
    .catch((err) => renderError(res, err.message))
})

//Recherche par date d'entrée
app.get('/annuaire/search/date=:id', (req, res) => {
    fetch.get('/search/date='+req.params.id)
    .then((response) => {
        renderCheck(res, "date d'entrée", 'date', response, req.params.id)
    })
    .catch((err) => renderError(res, err.message))
})


//Ajout d'un membre
app.get('/annuaire/add=:id', (req, res) => {
    fetch.get('/add='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success') {
            res.render('added.twig', {
                title:req.params.id + " employés ajoutés",
                employes: response.data.result
            })
        }
        else
            renderError(res, response.data.message)
    })
    .catch((err) => renderError(res, err.message))
})

//Lancement de l'application
app.listen(port, () => console.log('Démarré sur le port ' + port))

//Fonctions
function renderCheck(res, searchObj, urlObj, response, params) {
    if (response.data.status == 'success' && response.data.result != "")
        renderResult(res, searchObj, response.data.result, params.toString(), urlObj)
    else
        renderError(res, searchObj, params.toString(), urlObj)
}

function renderResult(res, _searchObj, _employees, _param, _urlObj) {
    res.render('result.twig', {
        title: 'Recherche par ' + _searchObj,
        param: 'Recherche : ' + _param,
        employes:_employees,
        searchObj: _urlObj
    })
}

function renderError(res, _searchObj, _param, _urlObj) {
    res.render('error.twig', {
        title: 'Recherche par ' + _searchObj,
        id: 'Recherche : ' + _param,
        param: 'Recherche : ' + _param,
        searchObj: _urlObj
    })
}

function renderSearch(res, _searchObj, _urlObj, _text) {
    if (_text != undefined)
        res.render('recherche.twig', {
            object:_urlObj,
            title:_searchObj,
            text: _text
        })
    else 
        res.render('rechercheDate.twig', {
            object:_urlObj,
            title:_searchObj,
        })
}