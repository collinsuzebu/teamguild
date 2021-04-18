## Project Management

Project management helps keep track of to-dos in a project.

Demo: [Live URL](http://34.86.12.67:3000)

## Technology Stack:

This project uses the following technologies and libraries:

[Node.js](https://nodejs.org/en/) for server

[Express.js](http://expressjs.com/) as Node web framework

[React.js](https://reactjs.org) for frontend.

[React Router](https://reacttraining.com/react-router/) for routing.

[Redux](https://redux.js.org/basics/usagewithreact) for state management

[MongoDB](https://www.mongodb.com/) for persistent data storage.

[Reactstrap](https://reactstrap.github.io/) for styling with bootstrap.

[SASS](https://sass-lang.com/) as CSS preprocessor for custom styling

[Express-generator](https://expressjs.com/en/starter/generator.html): to bootstrap express starter template.

[Create React App](https://github.com/facebook/create-react-app) to bootstrap react starter template.

[Babel](https://babeljs.io/) Compiler for backend javascript.

[Jest](https://jestjs.io/) Testing framework.

[Enzyme](https://enzymejs.github.io/enzyme/) Testing Utility for react.

### SETUP AND RUN

Create an Oauth app in GitHub, copy client ID and client secret.

Replace the following environment variables present in `/backend/backend.env`

```

GITHUB_APP_ID=

GITHUB_SECRET=

```

In github application interface set the following fields as;

`Homepage URL` = http://localhost:3000/

`Authorization callback URL` = http://localhost:5000/login/oauth2/github

If running with `Docker`,

`Homepage URL` = http://localhost

`Authorization callback URL` = http://localhost:5000/api/login/oauth2/github

The `/api` prefix is for routing in nginx.

Create or rename the file `backend.sample.env` > `backend.env`

### To run the application locally without docker, you must have mongodb installed;

You'd need to map localhost to a different address in other for cookie domain to work.
E.g localhost > localhost.mysite:3000 localhost.mysite:5000

So replace any instance of localhost in this doc to your new mapped localhost address.

##### Configure the `/backend/backend.env` file.

`cd /backend`

Add the following variables

```

FRONTEND_URL=http://localhost:3000

MONGO_DB_CONNECTION_STRING=mongodb://localhost:27017/teamGuild

```

This would make sure it points to your localhost.

`npm run dev`

##### In another terminal, spin up the frontend server

`cd /frontend`

First configure the `/frontend/.env`

Add the following variables

```

REACT_APP_BACKEND_SERVER=http://localhost:5000

```

`npm start`

## Running with Docker;

To run with docker, replace the environment variables to point to the docker **HOST** machine. These variables are both present in .env and backend.env files.

`MONGO_DB_CONNECTION_STRING` variable should not be included when running with docker.
This would allow docker use it's internal address to communicate with all containers present in the same network.
`COOKIE_DOMAIN` must be the domain name.
E.g `44.44.44.44`. If not specified, it uses `localhost`.

**UPDATE** The project uses `nginx` to serve react static files and also to proxy request. The 3 environment variable listed below should be the same. `No port` is required.

`NGINX_PREFIX="/api"` in config.js

```
FRONTEND_URL
COOKIE_DOMAIN
REACT_APP_BACKEND_SERVER

```

run the command

`docker-compose up -d`

Access the running container from `http://localhost:3000` or `http://your-domain:3000`

### Testing;

**To test the backend application,**

```

cd /backend

npm run test

```

**To test the frontend application,**

```

cd /frontend

npm run test

```

nano backend/backend.env
nano frontend/.env
