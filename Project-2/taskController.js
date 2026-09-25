const store = require("../data/store");

// GET /api/tasks
function getTasks(req, res) {
  const { completed } = req.query;
  let tasks = store.getAll();

  if (completed !== undefined) {
    const wantCompleted = completed === "true";
    tasks = tasks.filter((t) => t.completed === wantCompleted);
  }

  res.status(200).json({ count: tasks.length, tasks });
}

// GET /api/tasks/:id
function getTaskById(req, res) {
  const task = store.getById(req.taskId);
  if (!task) {
    return res.status(404).json({ error: "Not Found", message: `No task with id ${req.taskId}.` });
  }
  res.status(200).json(task);
}

// POST /api/tasks
function createTask(req, res) {
  const { title, completed = false } = req.body;
  const task = store.create({ title: title.trim(), completed: Boolean(completed) });
  res.status(201).json(task);
}

// PUT /api/tasks/:id
function updateTask(req, res) {
  const existing = store.getById(req.taskId);
  if (!existing) {
    return res.status(404).json({ error: "Not Found", message: `No task with id ${req.taskId}.` });
  }
  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.completed !== undefined) updates.completed = req.body.completed;

  const updated = store.update(req.taskId, updates);
  res.status(200).json(updated);
}

// DELETE /api/tasks/:id
function deleteTask(req, res) {
  const removed = store.remove(req.taskId);
  if (!removed) {
    return res.status(404).json({ error: "Not Found", message: `No task with id ${req.taskId}.` });
  }
  res.status(204).send();
}

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
