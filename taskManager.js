class Task {
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
        this.urgentTasks = [];
        this.categoryTree = new Map();
    }

    addTask(task) {
        this.tasks.push(new Task(task.title, task.description, task.priority, task.dueDate));
    }

    removeTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
    }

    listTasks() {
        return this.tasks.sort((a, b) => {
            if (a.priority !== b.priority) {
                return b.priority - a.priority;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }

    addUrgentTask(task) {
        this.urgentTasks.push(new Task(task.title, task.description, task.priority, task.dueDate));
    }

    processUrgentTasks() {
        this.urgentTasks = [];
    }

    getUrgentTasks() {
        return this.urgentTasks;
    }

    addTaskToCategory(category, subcategory, task) {
        if (!this.categoryTree.has(category)) {
            this.categoryTree.set(category, new Map());
        }
        if (!this.categoryTree.get(category).has(subcategory)) {
            this.categoryTree.get(category).set(subcategory, []);
        }
        this.categoryTree.get(category).get(subcategory).push(new Task(task.title, task.description, task.priority, task.dueDate));
    }

    getCategoryTree() {
        return this.categoryTree;
    }
}

module.exports = TaskManager;