# Fantasy All-Star

Fantasy All-Star frontend is designed with React hooks and Redux

## How it works

There are 4 routes in this Single-Page Application

### Home Page

This page is the main landing page and allows the user to see all the live games for the day with start times and the gaming score

### Login Page

This page allows the user to login with the proper crendentials or register a new account with the application

The login is handled with a JSON web token for additional security

`currentUser` is a state that holds the details of the User throughout the app managed with Redux

### Profile Page

The profile page is available once the user has logged in. From this page the User can edit the profiles Name, Email and Password upon verifying their password

The profile page also allows the User to delete the profile, which will log the User out and remove the User from the database

### Team Page

The team page is available once the user has logged in. From this page the User can modify team rosters, add and remove players from rosters and delete teams

The User can search for any player by name and filter the results by the team

Players on a team earn virtual points based off their performance from the actual games they play in. This is how Fantasy All-Stars is able to earn points for you


