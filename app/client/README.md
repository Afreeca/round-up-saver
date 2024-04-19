## Title: round-up Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Explanation of Technical Decisions

1. Function => getStartOfWeek
   to further understand this function that returns the first day of the current week we can take a closer look to the follow scenario

SCENARIO: TODAY is sunday:

- **currentDayOfWeek** will be 2
  - as JavaScript's getDay() method returns 0 for Sunday, 1 for Monday, and so on.
- **daysToSubtract** will be 1
  - Since Monday is the desired start of the week and it corresponds to 1, and today is Tuesday. Tuesday back to monday is just 1 day
- if **currentDayOfWeek** is 0 (Sunday), we want to go back 6 days back reach Monday(our last first day of the week)
- **beginningOfWeek** will hold Monday of the particular week

2. Memoize AccountCard component

- we could have memoize AccountCard component to prevent its re-render but it this case it is a very small component, and we should avoid using an memoized technique if there are no performance issues.

### cypress cloud

### Commands

1. launch the cypress test runner

```bash
   npm run cy:open
```

2. run componen tests

```bash
   npm run cy:component
```

2. run end to end tests

```bash
   npm run cy:e2e
```

3. run and record e2e test

```bash
    npx cypress run --record --key 78e2669a-c95a-4c28-9f98-6fcdf4dbcec9
```

### Info

#### cy.intercept() and request caching

cy.intercept() intercepts requests at the network layer. This can cause confusion when trying to intercept a request that has already been cached by the browser. If a request is served from the browser cache, it will never hit the network layer, and cy.intercept() will never fire.

To see if this is affecting your app, check the Developer Tools. In the following example, all of the requests circled in red have been served from cache, and will not send an HTTP request. Thus, they cannot be intercepted by cy.intercept():

Solution 1 :
The action of deleting the if-none-match header within the intercepted request affects how the request is handled by the server and the browser's caching mechanism. Let's break down the impact:

Preventing Conditional Requests: The if-none-match header is used by the browser to make conditional requests to the server. When a resource is cached, the browser sends a request with the if-none-match header containing the ETag of the cached resource. The server then checks if the ETag matches the current version of the resource. If it does, the server responds with a 304 status code (Not Modified), indicating that the cached version is still valid, and the browser can use its cached copy. If the ETag doesn't match, the server sends the updated resource. By deleting the if-none-match header, you prevent the browser from making conditional requests based on its cached version of the resource.
Forcing Fresh Requests: When the if-none-match header is deleted from the intercepted request, it effectively forces the browser to treat each intercepted request as a new, non-cached request. This means that the browser will always send the request to the server without relying on its cache or making conditional requests. As a result, the server responds with the full resource content rather than a 304 status code, ensuring that the browser receives the latest version of the resource.
In summary, deleting the if-none-match header from intercepted requests prevents conditional requests and forces the browser to treat each request as a fresh request, effectively bypassing or clearing the cache on the network request. This helps ensure that the browser receives the latest version of the requested resource without relying on its cache.

therefore we created a command to intercept request and delete the if-non-match header

```bash
Cypress.Commands.add('deleteIfNoneMatchHeader', () => {
  return cy.intercept('**', (req) => {
    delete req.headers['if-none-match'];
  });
});
```

Note: this only work if we rerun the test from the browser, but if we modify the test and rebuild it will fail
another solution: Disable the caching in the dev tools. [more](https://docs.cypress.io/api/commands/intercept#Intercepted-requests)

- Cypress Commands [here](https://docs.cypress.io/guides/guides/command-line)
- Cypress Queries [here](https://docs.cypress.io/api/table-of-contents/)
- extra info on Queries [here](https://example.cypress.io/)
- more info [here](https://github.com/cypress-io/cypress-example-kitchensink?tab=readme-ov-file)

Note: always best to write long test in cypress and short because of all process that cypress does for each test

https://cloud.cypress.io/projects/hsewzb/branches/main/overview
