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
