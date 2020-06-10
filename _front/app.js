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

app.get('/annuaire', (req, res) => {
    fetch.get('http://localhost:3000/annuaire')
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

app.get('/annuaire/search/nom=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/search/nom='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success' && response.data.result != "") {
            res.render('result.twig', {
                title:'Recherche par nom',
                employes: response.data.result,
                param: "Recherche : " + req.params.id
            })
        }
        else
            //renderError(res, response.data.message)
            res.render('error.twig', {
                errorMsg:'Aucun résultat',
            })
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/search/prenom=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/search/prenom='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success' && response.data.result != "") {
            res.render('result.twig', {
                title:'Recherche par prénom',
                employes: response.data.result,
                param: "Recherche : " + req.params.id
            })
        }
        else
            //renderError(res, response.data.message)
            res.render('error.twig', {
                errorMsg:'Aucun résultat',
            })
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/search/phone=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/search/phone='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success' && response.data.result != "") {
            res.render('result.twig', {
                title:'Recherche par téléphone',
                employes: response.data.result,
                param: "Recherche : " + req.params.id
            })
        }
        else
            //renderError(res, response.data.message)
            res.render('error.twig', {
                errorMsg:'Aucun résultat',
            })
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/search/service=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/search/service='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success') {
            res.render('result.twig', {
                title:'Recherche par service',
                employes: response.data.result,
                param: "Recherche : " + req.params.id
            })
        }
        else
            renderError(res, response.data.message)
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/search/date=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/search/date='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success') {
            res.render('result.twig', {
                title:"Recherche par date d'entrée",
                employes: response.data.result,
                param: "Recherche : " + req.params.id
            })
        }
        else
            renderError(res, response.data.message)
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/add=:id', (req, res) => {
    fetch.get('http://localhost:3000/annuaire/add='+req.params.id)
    .then((response) => {
        if (response.data.status == 'success') {
            res.render('result.twig', {
                title:req.params.id + " employés ajoutés",
                employes: response.data.result
            })
        }
        else
            renderError(res, response.data.message)
    })
    .catch((err) => renderError(res, err.message))
})

app.get('/annuaire/search/nom', (req, res) => {
    res.render('recherche.twig', {
        object:"nom",
        title:"nom",
        text:"Nom"
    })
})

app.get('/annuaire/search/prenom', (req, res) => {
    res.render('recherche.twig', {
        object:"prenom",
        title:"prénom",
        text:"Prénom"
    })
})

app.get('/annuaire/search/phone', (req, res) => {
    res.render('recherche.twig', {
        object:"phone",
        title:"numéro de téléphone",
        text:"0xxxxxxxxx"
    })
})

app.get('/annuaire/search/date', (req, res) => {
    res.render('rechercheDate.twig', {
        object:"date",
        title:"date d'entrée"
    })
})

app.get('/annuaire/search/service', (req, res) => {
    res.render('recherche.twig', {
        object:"service",
        title:"service",
        text:"Service-du-contact"
    })
})

//Lancement de l'application
app.listen(port, () => console.log('Démarré sur le port ' + port))

//Fonctions
function renderError(res, errMsg) {
    res.render('error.twig', {
        object:'Recherche',
        errorMsg: errMsg
    })
}