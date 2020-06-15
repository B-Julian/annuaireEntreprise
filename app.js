//Modules
const express = require('express'),
  mysql = require('promise-mysql'),
  config = require('./assets/config'),
  morgan = require('morgan')('dev'),
 {success, checkResult} = require('./assets/functions'),
  axios = require('axios')

mysql.createConnection({
  host: config.db.host,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password
}).then((db) => {

    //Variables globales
    const app = express()
    let ManagerPerson = require('./assets/classes/managerperson-class')(db, config)
    let {Personne} = require('./assets/classes/person-class')

    app.use(morgan)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))

    //Envoie tous les membres
    app.get('/annuaire', async (req, res) => {
      let getPerson = await ManagerPerson.getAll()
      res.json(success(getPerson))
    })

    //Recherche par nom
    app.get('/annuaire/search/nom=:id', async (req, res) => {
      let searchLName = await ManagerPerson.searchByLName(req.params.id)
      res.json(checkResult(searchLName))
    })

    //Recherche par prénom
    app.get('/annuaire/search/prenom=:id', async (req, res) => {
      let searchFName = await ManagerPerson.searchByFName(req.params.id)
      res.json(checkResult(searchFName))
    })

    //Recherche par numéro de tel
    app.get('/annuaire/search/phone=:id', async (req, res) => {
      let searchPhone = await ManagerPerson.searchByPhone(req.params.id)
      res.json(checkResult(searchPhone))
    })

    //Recherche par service
    app.get('/annuaire/search/service=:id', async (req, res) => {
      let searchService = await ManagerPerson.serchByService(req.params.id)
      res.json(checkResult(searchService))
    })

    //Recherche par date
    app.get('/annuaire/search/date=:id', async (req, res) => {
        let searchDate = await ManagerPerson.serchByDate(req.params.id)
        res.json(checkResult(searchDate))
    })

    //Ajout d'un membre
    app.get('/annuaire/add=:id', async (req, res) => {
      let newEmployees = [] 
      for (let i = 0; i < req.params.id; i++) {
        await axios.get('https://randomapi.com/api/t724srr6?key=HQVB-2SUT-QOUU-1H1R')
        .then(async (response) => {
          let RandomEmployee = response.data.results[0]
          ManagerPerson.addPerson(RandomEmployee.lname, RandomEmployee.fname, RandomEmployee.phone, RandomEmployee.date, RandomEmployee.serviceNum)
          newEmployees.push(new Personne(RandomEmployee.lname, RandomEmployee.fname, RandomEmployee.phone, RandomEmployee.date, RandomEmployee.service))
        })
      }
      res.json(success(newEmployees))
    })

    app.listen(config.port, () => console.log('Démarré sur le port '+config.port))

}).catch((err) => {
    console.log('Erreur lors de la connection à la BDD')
    console.log(err.message)
})