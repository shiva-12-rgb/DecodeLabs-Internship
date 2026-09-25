# Project 2 — Backend API Development (Task Manager API)

DecodeLabs Full Stack Development Internship — Industrial Training Kit — Project 2.

A simple, dependency-light REST API built with Node.js + Express that manages a
list of tasks. It demonstrates the required skills: creating GET/POST (and
PUT/DELETE) endpoints, handling user input, validating basic data, and
returning correct HTTP status codes.

## Tech stack
- Node.js
- Express.js
- In-memory data store (no database required — easy to swap for MongoDB/Postgres later)

## Getting started

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

For auto-restart during development:
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|---------------------------------------|
| GET    | `/api/tasks`      | List all tasks (optional `?completed=true`) |
| GET    | `/api/tasks/:id`  | Get a single task by id               |
| POST   | `/api/tasks`      | Create a task `{ title, completed? }` |
| PUT    | `/api/tasks/:id`  | Update a task `{ title?, completed? }`|
| DELETE | `/api/tasks/:id`  | Delete a task                         |

## Example requests

Create a task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Push Project 2 to GitHub"}'
```

List tasks:
```bash
curl http://localhost:3000/api/tasks
```

Update a task:
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Delete a task:
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

## Status codes used
- `200 OK` — successful GET/PUT
- `201 Created` — successful POST
- `204 No Content` — successful DELETE
- `400 Bad Request` — invalid/missing input
- `404 Not Found` — task or route doesn't exist
- `500 Internal Server Error` — unexpected server failure

## Project structure
```
.
├── controllers/
│   └── taskController.js   # business logic
├── data/
│   └── store.js             # in-memory "database"
├── middleware/
│   └── validateTask.js      # input validation ("never trust the client")
├── routes/
│   └── tasks.js              # route definitions
├── server.js                 # app entry point
├── package.json
└── README.md
```

## Notes
- Data resets on server restart (in-memory store). Swapping in a real database
  only requires changing `data/store.js` — routes and controllers stay the same.
- Built as part of the DecodeLabs Full Stack Development Internship, Batch 2026.
