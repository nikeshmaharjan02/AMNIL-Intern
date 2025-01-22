class Todo {
    constructor(id, task, isCompleted = false) {
        this.id = id;
        this.task = task;
        this.isCompleted= isCompleted;
    }
}
module.exports = Todo;
