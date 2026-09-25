const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const {
  validateTaskCreate,
  validateTaskUpdate,
  validateIdParam,
} = require("../middleware/validateTask");

// Resources are nouns, methods are verbs: GET/POST /api/tasks, GET/PUT/DELETE /api/tasks/:id
router.get("/", getTasks);
router.get("/:id", validateIdParam, getTaskById);
router.post("/", validateTaskCreate, createTask);
router.put("/:id", validateIdParam, validateTaskUpdate, updateTask);
router.delete("/:id", validateIdParam, deleteTask);

module.exports = router;
