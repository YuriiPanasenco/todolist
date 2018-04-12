export default class Task {

    constructor(id, name, description) {
        this.id = id === undefined ? -1 : id;
        this.name = name;
        this.description = description;
        this.status;
    }

    copy() {
        let task = new Task(this.id, this.name, this.description);
        if (this.status != null) {
            task.status = this.status.copy();
        }
        return task;
    };

    isNew() {
        return this.id == -1;
    };
};