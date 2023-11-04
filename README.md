# ts-node-express-postgressql-to-do-app

## An Express REST API for creating, viewing, editing, and deleting tasks.

### This is a portfolio piece to show general programming, containerization, and deployment. So it is not a completely polished piece.

####Tech Stack Used:

-   JavaScript
-   TypeScript
-   Node.js
-   Express.js
-   PostgresSQL
-   Sequelize ORM
-   Express-validator
-   Node-jsonwebtoken
-   Docker
-   AWS ECR
-   AWS Secrets Manager
-   AWS App Runner
-   Nodemon
-   PM2

#### More Info:

1. Signup and signin auth endpoints, hashing of passwords, JWT signing and verifying.
1. Contains a handful of CRUD endpoints (Postman collection located at ./postman)
1. Uses express-validator to validate incoming requests to endpoints
1. Uses JWT auth middleware to protect endpoints unless a user is logged in. Also setup to only allow a user to create/view/edit/delete tasks for themselves.
1. Uses PostgresSQL DB leveraging Sequelize ORM with users and tasks table/model.
1. ES module
1. TypeScript for strong typing.
1. Routes, Controllers, Middleware, and Models directories.
1. A .gitignore file.
1. Nodemon for development.
1. PM2 for production - clustering enababled with max of two instances since this is portfolio work only.
1. dotenv library for environment variables.
1. Dockerfile for containerization.
1. ESLint using Standard config and Prettier for linting and formatting.

#### Acknowleded Improvement Possabilites

Since this is a portfolio piece, there is room for improvement on making this truly production level. I'll list some of them below so that you know I understand them.

1. UI - I've chosen to focus on backend projects at this time, but the Postman collection is there if you would like to interact with the server.
1. Cors - Right now I am letting any request in. I would want to limit this to the domain of the client if this were going to be loosly couped with a frontend.
1. Auth - This is a basic auth flow. It doesn't include logout, token blacklist, token refresh, forgot password, change password, and etc. Ideally, I would leverage more robust auth libraries or services for something more critical.
1. Additional endpoints and functionality:

-   Pagination could be added to handle larger tasks lists, or larger completed tasks lists
-   A string match search endpoint could be created for returning tasks that match a request string, but this could also be done on the frontend.
-   The ability to whitelist users to view your tasks for shared task completion. Would require DB schema adjustments, of course.

1. Unit testing
1. CI/CD and different branches/envs - Keeping everything on main branch directly as I one person.
1. Documentation - I would add Swagger or etc. to this to document the endpoints. I have opted to provide the collection data instead, so that I can focus on developing projects and not documenting at this time.
