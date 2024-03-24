# Starling Bank exercice

## Title:

RoundUpSaver: Save Spare Change for Future Adventures

### Project Description

RoundUpSaver is your personal finance companion designed to help you effortlessly save spare change from your everyday transactions. With RoundUpSaver, you can turn your loose change into meaningful savings, contributing towards your future adventures, big or small.

### Project directory structure

    ├── app/
    │ ├── server/ # Server-side code
    │ | ├── src/ # React components and application logic
    | | ├── test/ # Test files and suites
    | | ├── Dockerfile # Dockerfile for building the application
    │ | ├── package.json # Frontend dependencies and scripts
    | | ├── .env.dev.example # environment variables needed to run the server app
    │ │ └── ... # Other server-related files
    │ │
    │ └── client/ # Frontend code
    │   ├── public/ # Public assets
    │   ├── src/ # React components and application logic
    |   ├── tests/ # Test files and suites
    |   ├── Dockerfile # Dockerfile for building the application
    │   ├── package.json # Frontend dependencies and scripts
    |   ├── .env. # environment variables
    │   └── ... # Other frontend-related files
    │
    ├── docker-compose.yml # Docker Compose file for running one or both application
    ├── Technical_Challenge.pdf # technical challenge doc
    └── README.md # Project documentation

## Languages and Tools

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Tools

<a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://nestjs.com/logo-small.ede75a6b.svg" alt="nestjs" width="40" height="40"/></a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>

<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> 
<a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a>

## Requirements

Follow the instructions provided in the official documentations for your OS

- Nodejs and npm -> https://nodejs.org/en/download/
- docker -> https://www.docker.com/get-started/
- docker-compose -> https://docs.docker.com/compose/install/

## How to run the application

#### Run it manually

To run the application manually you need nodejs and npm installed and then follow these steps:

1. Start the backend server:

   1. from the root folder(round-up-saver), navigate to server folder:
      ```bash
      cd app/server
      ```
   2. install dependencies
      ```bash
      npm install
      ```
   3. run the server
      ```bash
      npm run start
      ```

2. Start the frontend UI:
   1. from the root folder(round-up-saver), navigate to client folder:
      ```bash
      cd app/client
      ```
   2. install dependencies
      ```bash
      npm install
      ```
   3. run the ui
      ```bash
      npm run start
      ```

#### Run it using docker

To run the application using docker you need docker and docker-compose installed and then follow these steps:

1. Build the docker image for the backend server:
   ```bash
   docker build -t round-up-saver-server ./app/server
   ```
2. Run server as docker container:

   ```bash
   docker run --name round-up-api -d -p 5000:5000 round-up-saver-server

   ```

3. Build the docker image for the client UI:

   ```bash
   docker build -t round-up-saver-client ./app/client

   ```

4. Run ui as docker container:
   ```bash
   docker run --name round-up-ui -d -p 80:80 round-up-saver-client
   ```

#### Run it using docker-compose (recommended)

To run the application using docker-compose you need docker and docker-compose installed and then follow these steps:

1. Alternatively you can run the app using docker-compose
   ```bash
   docker-compose up -d
   ```
   Note: to stop the app just run:
   ```bash
   docker-compose down
   ```

### acess the UI application

Once the application is running, you can access the UI by opening [http://localhost:80](http://localhost:80) or [http://localhost](http://localhost) in your browser

### Port Conflict

If you encounter port conflicts, it might be due to other applications using the same ports. Before running the application, ensure that ports 5000, 80, are available. If not, you can modify the port bindings in the dockerfiles(ui and server) and also in the docker-compose file

### Run tests

there are only frontend ui tests, therefore To run tests:

1. navigate to ui folder::

   ```bash
   cd app/ui

   ```

2. use the following command to run them
   ```bash
   npm test
   ```

## Author

### `Adilson Mendes`
