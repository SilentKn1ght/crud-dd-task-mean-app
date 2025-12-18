In this DevOps task, you need to build and deploy a full-stack CRUD application using the MEAN stack (MongoDB, Express, Angular 15, and Node.js). The backend will be developed with Node.js and Express to provide REST APIs, connecting to a MongoDB database. The frontend will be an Angular application utilizing HTTPClient for communication.  

The application will manage a collection of tutorials, where each tutorial includes an ID, title, description, and published status. Users will be able to create, retrieve, update, and delete tutorials. Additionally, a search box will allow users to find tutorials by title.

## Project setup

### Node.js Server

cd backend

npm install

You can update the MongoDB credentials by modifying the `db.config.js` file located in `app/config/`.

Run `node server.js`

### Angular Client

cd frontend

npm install

Run `ng serve --port 8081`

You can modify the `src/app/services/tutorial.service.ts` file to adjust how the frontend interacts with the backend.

Navigate to `http://localhost:8081/`
=======
# crud-dd-task-mean-app
Full-stack MEAN application with Docker, CI/CD, and Nginx deployment

## Node.js Version

The project targets Node.js 20 (LTS). For local development, use `nvm` (or nvm-windows) and run:

```bash
nvm install 20
nvm use 20
```

Indicators:
- `.nvmrc` files in repo, frontend, and backend specify `20`.
- `engines` fields in `frontend/package.json` and `backend/package.json` declare `>=18 <23`.

## UI/UX Enhancements

The Angular app now features a modern dark theme and clearer flows:

- Layout: compact navbar and centered content container.
- List: responsive table with status badges, search on Enter, loading spinner, and error alerts.
- Details: card-based presentation with quick Edit link.
- Forms: card layout, inline validation, disabled submit until valid, and submit spinner.
- Safety: confirmations for destructive actions (delete/remove all).

Implementation notes:
- Upgraded to Bootstrap 5.3 (see `frontend/package.json`).
- Global theme and component polish live in `frontend/src/styles.css`.

Quick frontend commands (run in `frontend/`):

```bash
npm install
npm start
# or
npm run build
```
