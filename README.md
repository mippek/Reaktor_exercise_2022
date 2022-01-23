# Reaktor exercise 2022
A web application for fetching rock,paper,scissors game data. 
Fetches live data of ongoing games from https://bad-api-assignment.reaktor.com/rps/live
and history data of ended games from https://bad-api-assignment.reaktor.com/rps/history.
The /rps/history API endpoint has several pages of data so the application fetches all of them.
The app shows in real-time all ongoing games at the top of the page.
It also shows the game history player-wise.
The history shows data for each player separately. 
This data includes win ratio, number of pplayed games and the most played hand. 
For each player all of his played games can be seen by pressing a button to be able to scroll through all his played games.

The application is the coding exercise for Reaktor's trainee job application 2022. 
When the history data is being loadded a text 'Loading...' is shown on the page above the list of players. 
Because there are so many pages of data, the history data is refreshed every hour.

The application is running at Heroku at: https://mippe-rps-game.herokuapp.com/
However, in production mode the fetching of history data from /rps/history is not working due to CORS-policy that I did not have time to fix. The app works correctly in development mode with a proxy.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.