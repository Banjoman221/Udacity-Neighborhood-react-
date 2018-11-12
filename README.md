# Udacity Neighborhood React App

This app was made for the Udacity Front-End Development Course. It shows some of the places to eat in my area. You can filter the list on the left side of the page to see the only relevant places. If you click on one of the places on the list, it brings up an infoWindow on top of its corresponding marker to show more details.

## How to Run:
To run the app, you must download or clone this repository and have node.js and npm installed. Once they are installed, open you respective terminal and cd into folder that the files were downloaded in. Then type in `npm install` to install all the dependencies and once it is finished type in `npm start` to run the code.

Note- Server worker will only work in production mode

To run the app in production mode, first follow steps above but instead of running npm start type in `npm run-script build` or `yarn build`. Once it is completed, type in `serve -s build`, this will give you a new connection to the production build on localhost:5000. This new build will run the service worker.

## What was Used:
- [React.js](https://reactjs.org/)
- [React-google-maps](https://tomchentw.github.io/react-google-maps/)
- [Recompose](https://github.com/acdlite/recompose)
- [FoursqaureApi](https://foursquare.com)
