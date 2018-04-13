export default class User {
    constructor(id, name, mail) {
        this.id = id;
        this.name = name;
        this.mail = mail;
    }
    
    static buildFromJson(json){
        return new User(json.id, json.name, json.email);
    }
};