## Project Management

Project management helps keep track of to-dos in a project.

Demo: [Live URL](http://example.com)

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
`Homepage URL` = http://localhost:5000/
`Authorization callback URL` = http://localhost:5000/login/oauth2/github

Create or rename the file `backend.sample.env` > `backend.env`

### To run the application locally without docker, you must have mongodb installed;

##### Configure the `/backend/backend.env` file.

`cd /backend`

Add the following variables

```
FRONTEND_URL=http://localhost:3000
MONGO_DB_CONNECTION_STRING=`mongodb://localhost:27017/projectManager
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

### Running with Docker;

Make sure the following variables are **excluded** from both .env and backend.env files. This would allow docker use it's internal address to communicate with all containers present in the same network.

```
FRONTEND_URL
MONGO_DB_CONNECTION_STRING
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
