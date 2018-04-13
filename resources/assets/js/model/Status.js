export default class Status {

    static buildFromJson(json) {
        return new Status(json.id, json.name);
    }

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    copy() {
        return new Status(this.id, this.name);
    }
};
