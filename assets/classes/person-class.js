let Nom, Prenom, Telephone, Service, Date

let Personne = class Personne {
    constructor(_lname, _fname, _phone, _date, _serv) {
        this.Nom = _lname
        this.Prenom = _fname
        this.Telephone = _phone
        this.Date = _date
        this.Service = _serv
    }
}

module.exports.Personne = Personne