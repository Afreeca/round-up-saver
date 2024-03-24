# Starling Bank exercice

## Title:

RoundUpSaver: Save Spare Change for Future Adventures

### Project Description

RoundUpSaver is your personal finance companion designed to help you effortlessly save spare change from your everyday transactions. With RoundUpSaver, you can turn your loose change into meaningful savings, contributing towards your future adventures, big or small.

### Product assumptions

- First day of the week is Monday
- Further explaination on the function getStartOfWeek

- SCENARIO: TODAY is sunday:
  - currentDayOfWeek will be 2, as JavaScript's getDay() method returns 0 for Sunday, 1 for Monday, and so on.
  - daysToSubtract will be 1 -> Since Monday is the desired start of the week and it corresponds to 1,
  - subtracting 1 from Tuesday (2), which represents the number of days to go back to Monday.
  - if currentDayOfWeek is 0 (Sunday), we want to go back 6 days back reach Monday(our last first day of the week)

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

Follow the instructions provided in the official documentation for your OS

- Nodejs and npm -> https://nodejs.org/en/download/
- docker -> https://www.docker.com/get-started/
- docker-compose -> https://docs.docker.com/compose/install/

## How to run the application

#### Run it using Docker Compose (Recommended)

To run the application using Docker Compose, you need Docker and Docker Compose installed. Follow these steps:

1. To build both sever and client(UI), run the app using Docker Compose
   ```bash
   docker-compose up -d
   ```
   Note: to stop the applications just run:
   ```bash
   docker-compose down
   ```

#### Run it Manually

To run the application manually, you need Node.js and npm installed. Follow these steps:

1. Start the backend server:

   1. from the root folder (round-up-saver), navigate to server folder:
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

   1. From the root folder (round-up-saver), navigate to the client folder:

      ```bash
      cd app/client
      ```

   2. install dependencies
      ```bash
      npm install
      ```
   3. run the UI
      ```bash
      npm run start
      ```

#### Run it using Docker

To run the application using Docker, you need Docker installed. Follow these steps:

1. Build the Docker image for the backend server:
   ```bash
   docker build -t round-up-saver-server ./app/server
   ```
2. Run server as Docker container:

   ```bash
   docker run --name round-up-api -d -p 5000:5000 round-up-saver-server

   ```

3. Build the Docker image for the client UI:

   ```bash
   docker build -t round-up-saver-client ./app/client

   ```

4. Run UI as Docker container:
   ```bash
   docker run --name round-up-ui -d -p 80:80 round-up-saver-client
   ```

### Access the UI Application

Once the application is running, you can access the UI by opening [http://localhost:80](http://localhost:80) or [http://localhost](http://localhost) in your browser

### Port Conflict

If you encounter port conflicts, it might be due to other applications using the same ports. Before running the application, ensure that ports 5000 and 80 are available. If not, you can modify the port bindings in the Dockerfiles (UI and server) and also in the docker-compose file.

### Run tests

There are only frontend UI tests. Therefore, to run tests:

1. Navigate to UI folder::

   ```bash
   cd app/ui

   ```

2. Use the following command to run all the tests:
   ```bash
   npm test
   ```

### Improvements(production ready)

The following are points which we could improve or implement in order to be production ready.

#### Product

1. allow only one round up per week(a must)
2. clarify with "stakeholders" the concept of first day of the week and make changes to reflect that

#### Server

1. Error Handling:

   - We could implement a centralized error handling mechanism to deal with any app errors consistently. For errors from external APIs like the Starling Dev Portal, we could ensure the correct error and message is sent to the client.

2. Improve token management:
   - instead of fetching token every single time for every single request we need to cache in-memory the last token and validate the expiration time, and we only fetch a new token if the old one expires. maybe solutions like'node-cache' or memory-cache'could be used
   - we could use a middleware or similar solution to process token renewal asynchronously even before it expires.
3. Improve the logging allowing
   - we could log more relevant informations without exposing sensitive data like:
   - maybe with so many logs we could have a tool to allow us to search and find logs, like Elasticsearch.
4. Environment Variables:
   - Create more .env files. For example, for production, we could have a .env.prod file. Additionally, consider using tools for secret keys management like HashiCorp Vault or cloud-based solutions.
5. Pagination:
   - implemente pagination if supported by external API
6. Tests:
   - Maybe increate the unit test coverage
   - Add integraction test to ensure the different components/adapters are well integrated and working
   - add E2E tests making sure the full flow is working as intended, using tools like Cypress
   - Pact tests may be unnecessary here, but in some cases, it's a nice-to-have to ensure compatibility between the server and client.

#### Client

1. Redux improvements:
   - Consider using redux-persist to persist some of the data on refresh.
   - Evaluate whether we really need an external library to manage the global app state. We could use the Context API and reduce the boilerplate.
2. Mobile first
   - Ensure that we prioritize creating a user experience focused on mobile users before adapting it to other device types.
   - Make sure the components are responsive enough for all types of devices.
3. Performance Improvements:
   - Review all React components and apply appropriate memoization techniques such as useMemo, useCallback, and memo to improve performance by preventing unnecessary re-renders.
   - Reduce the number of API calls by implementing some caching mechanism.

#### Global

1. Naming in convension:
   - Review all function and variable names to ensure they are clear, meaningful, and descriptive enough, and they only perform what they are supposed to.
2. Typescript types:
   - Review the names of TypeScript types.
   - Extract common types to increase reusability across the codebase.
3. Code formating
   - Ensure consistent code formatting throughout the project.
4. Client and server commons:
   - There are some common functionalities and data types shared between the client and server. Create a common library for all shared code to reduce duplication and inconsistency.

## Author

### `Adilson Mendes`
