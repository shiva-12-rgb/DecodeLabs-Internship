const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON request bodies

// Basic request logger (helps show server-side processing during review)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "DecodeLabs Project 2 - Task Manager API is running.",
    endpoints: {
      "GET /api/tasks": "List all tasks (optional ?completed=true|false)",
      "GET /api/tasks/:id": "Get a single task",
      "POST /api/tasks": "Create a task { title, completed? }",
      "PUT /api/tasks/:id": "Update a task { title?, completed? }",
      "DELETE /api/tasks/:id": "Delete a task",
    },
  });
});

app.use("/api/tasks", taskRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", message: `Route ${req.originalUrl} does not exist.` });
});

// Centralized error handler (catches anything thrown/passed to next(err))
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", message: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
