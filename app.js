//Modules
const express = require('express'),
  mysql = require('promise-mysql'),
  config = require('./assets/config'),
  morgan = require('morgan')('dev'),
 {success, error} = require('./assets/functions'),
  axios = require('axios')
var fs = require('fs')

  
mysql.createConnection({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then((db) => {

    //Variables globales
    const app = express()
    let MembersRouter = express.Router()
    let ManagerPerson = require('./assets/classes/managerperson-class')(db, config)
    let {Personne} = require('./assets/classes/person-class')

    app.use(morgan)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    MembersRouter.route('/')

    //Envoie tous les membres
    .get(async (req, res) => {
      let getPerson = await ManagerPerson.getAll()
      /*let Personnes = []
      for (let i = 0; i < getPerson.length; i++) {
        Personnes.push(new Personne(getPerson[i].nom, getPerson[i].prenom, getPerson[i].telephone, getPerson[i].date, getPerson[i].service))
      }*/
      res.json(success(getPerson))
    })
    //MembersRouter.route('/search')

    //Recherche par nom
    app.get('/annuaire/search/nom=:id', async (req, res) => {
      if (req.params.id != "") {
        let searchLName = await ManagerPerson.searchByLName(req.params.id)
        res.json(success(searchLName))
      }
      else
        res.json(error('Nom invalide'))
    })

    //Recherche par prénom
    app.get('/annuaire/search/prenom=:id', async (req, res) => {
      if (req.params.id != "") {
        let searchFName = await ManagerPerson.searchByFName(req.params.id)
        res.json(success(searchFName))
      }
      else
        res.json(error('Nom invalide'))
    })

    //Recherche par numéro de tel
    app.get('/annuaire/search/phone=:id', async (req, res) => {
      if (req.params.id != "") {
        let searchPhone = await ManagerPerson.searchByPhone(req.params.id)
        res.json(success(searchPhone))
      }
      else
        res.json(error('Nom invalide'))
    })

    //Recherche par service
    app.get('/annuaire/search/service=:id', async (req, res) => {
      if (req.params.id != "") {
        let searchService = await ManagerPerson.serchByService(req.params.id)
        res.json(success(searchService))
      }
      else
        res.json(error('Service invalide'))
    })

    //Recherche par date
    app.get('/annuaire/search/date=:id', async (req, res) => {
      if (req.params.id != "") {
        let searchDate = await ManagerPerson.serchByDate(req.params.id)
        res.json(success(searchDate))
      }
      else
        res.json(error('Date invalide'))
    })

    //Ajout d'un membre
    app.get('/annuaire/add=:id', async (req, res) => {
      if (req.params.id != "") {
        let RandomEmployee
        let newEmployees = [] 
        for (let i = 0; i < req.params.id; i++) {
          await axios.get('https://randomapi.com/api/t724srr6?key=HQVB-2SUT-QOUU-1H1R')
          .then(async (response) => {
            RandomEmployee = response.data.results[0]
            let addNew = ManagerPerson.addPerson(RandomEmployee.lname, RandomEmployee.fname, RandomEmployee.phone, RandomEmployee.date, RandomEmployee.serviceNum)
            newEmployees.push(new Personne(RandomEmployee.lname, RandomEmployee.fname, RandomEmployee.phone, RandomEmployee.date, RandomEmployee.service))
          })
        }
        res.json(success(newEmployees))
      }
      else
        res.json(error('Nombre invalide'))
    })

    app.use(config.rootAPI, MembersRouter)
    app.listen(config.port, () => console.log('Démarré sur le port '+config.port))

}).catch((err) => {
    console.log('Erreur lors de la connection à la BDD')
    console.log(err.message)
})