export default class Status {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    copy() {
        return new Status(this.id, this.name);
    }
};
