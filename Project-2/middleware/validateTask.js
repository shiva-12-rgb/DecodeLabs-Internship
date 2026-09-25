// "Never trust the client" — validate every incoming request body.

function validateTaskCreate(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "'title' is required and must be a non-empty string.",
    });
  }

  if (title.length > 120) {
    return res.status(400).json({
      error: "Bad Request",
      message: "'title' must be under 120 characters.",
    });
  }

  next();
}

function validateTaskUpdate(req, res, next) {
  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "'title', if provided, must be a non-empty string.",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Bad Request",
      message: "'completed', if provided, must be a boolean.",
    });
  }

  next();
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Task id must be a positive integer.",
    });
  }
  req.taskId = id;
  next();
}

module.exports = { validateTaskCreate, validateTaskUpdate, validateIdParam };
