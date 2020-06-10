let db, config

module.exports = (_db, _config) => {
    db = _db
    config = _config
    return ManagerPerson
}

let ManagerPerson = class {

    // Envoie tous les membres
    static getAll() {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE service_id = services.idservice')
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static searchByLName(lnom) {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE nom = ? AND service_id = services.idservice', [lnom])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static searchByFName(fnom) {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE prenom = ? AND service_id = services.idservice', [fnom])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static searchByPhone(phone) {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE telephone = ? AND service_id = services.idservice', [phone])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static serchByService(service) {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE services.service = ? AND service_id = services.idservice', [service])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static serchByDate(date) {
        return new Promise((next) => {
            db.query('SELECT nom, prenom, telephone, date, services.service FROM employes, services WHERE date = ? AND service_id = services.idservice', [date])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }

    static addPerson(nom, prenom, tel, date, serv) {
        return new Promise((next) => {
            db.query('INSERT INTO employes(nom, prenom, telephone, date, service_id) VALUES (?, ?, ?, ?, ?)', [nom, prenom, tel, date, serv])
            .then((result) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].date = result[i].date.toDateString()
                }
                next(result)
            })
            .catch((err) => next(err))
        })
    }
}

