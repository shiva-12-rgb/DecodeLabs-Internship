// Simple in-memory data store.
// Swap this for a real database later (MongoDB/Postgres) without touching the routes/controllers.

let tasks = [
  { id: 1, title: "Design API endpoints", completed: true },
  { id: 2, title: "Add input validation", completed: false },
  { id: 3, title: "Write README", completed: false },
];

let nextId = 4;

module.exports = {
  getAll: () => tasks,
  getById: (id) => tasks.find((t) => t.id === id),
  create: (task) => {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
  },
  update: (id, updates) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  },
  remove: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
