# Event Buddy

Event Buddy is a full-stack application designed to help you manage and track events. It features a robust Node.js/Express backend with a PostgreSQL database and a modern React frontend styled with Chakra UI.

## Project Structure

The project is divided into two main parts:

- **Backend (Root Directory):** Express server, database services, and API documentation.
- **Frontend (`/event-buddy`):** React application built with Vite and Chakra UI.

## Features

- **Event Management:** Create, read, update, and delete events.
- **API Documentation:** Integrated Swagger UI for exploring and testing the API.
- **Modern UI:** Responsive and clean user interface built with Chakra UI.
- **Database Integration:** Persistent storage using PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) installed and running locally.
- A database named `event_planner` created in PostgreSQL.

## Getting Started

### 1. Database Setup

Ensure your PostgreSQL server is running and create the `event_planner` database:

```sql
CREATE DATABASE event_planner;

\c event_planner;

CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    attendees TEXT[] DEFAULT '{}'
);
```

*Note: Check `db.js` to ensure the database connection parameters (user, password, port) match your local setup.*

### 2. Backend Installation & Setup

From the root directory:

```bash
# Install dependencies
npm install

# Start the server
node app2.js
```

The backend server will run at `http://localhost:3000`.
- **API Documentation:** Visit `http://localhost:3000/api-docs` to view the Swagger UI.

### 3. Frontend Installation & Setup

Navigate to the `event-buddy` directory:

```bash
cd event-buddy

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at the URL provided by Vite (usually `http://localhost:5173`).

## API Endpoints

- `GET /events`: List all events.
- `GET /events/:eventId`: Get details of a specific event.
- `POST /events`: Create a new event.
- `PUT /events/:eventId`: Update an existing event.
- `PATCH /events/:eventId`: Partially update an event.
- `DELETE /events/:eventId`: Remove an event.

## Tech Stack

- **Frontend:** React, Vite, Chakra UI, Framer Motion.
- **Backend:** Node.js, Express, PostgreSQL, Swagger/OpenAPI.
- **Utilities:** Pino (logging), CORS, js-yaml.

## License

This project is licensed under the ISC License.
