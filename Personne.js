class Personne {
    constructor(name, phone, serv, date) {
        this.name = name;
        this.phone = phone;
        this.serv = serv;
        this.date = date;
    }
    
    get getData() {
        return [this.name, this.phone, this.serv, this.date];
    }
    get getName() {return this.name;}
    get getPhone() {return this.phone;}
    get getServ() {return this.serv;}
    get getDate() {return this.date;}

    set editName(name) {this.name = name;}
    set editPhone(phone) {this.phone = phone;}
    set editServ(serv) {this.serv = serv;}
    set editDate(date) {this.date = date;}
}

module.exports.Personne = Personne;